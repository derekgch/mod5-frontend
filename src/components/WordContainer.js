import React, { Component } from 'react';

import WordQuestion from './WordQuestion'
import FirePlatform from './FirePlatform'
import { connect } from 'react-redux'
import Bullet from './Bullet'
import Instruction from './instruction'
import DisplayRW from './RightOrWrong'
import { setLevel } from '../actions';
import HpBar from './HpBar';
import Score from './Scores';
import Adapter from '../Adapter'

import { swapVowels, replaceVowel, numberOfVowels, swapWords } from './GenerateQuestions';
import UUID from 'uuid'
import {TweenMax, Power1, TimelineLite, TweenLite, Sine} from "gsap/TweenMax";

const vowels="AEIOU";
class GameContainer extends Component {
    state = {
        vowelIndex: 0,
        def: null,
        answer: null,
        filledLetter: [],
        userEq: [],
        userAns:[],
        checkingAns: false,
        hp:100,
    }

    componentDidMount(){
        this.genWord(this.props);
        let qCnt = this.refs.qContainer;
        this.flyLeft(qCnt, 15, "qContainer", 0.1);
        this.togglePos(true, true)
        this.setBasePosFn();
        document.addEventListener("keydown", this.handleKeyEvent)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyEvent);
    }

    setBasePosFn=()=>{
        if(this.firePlatform)    
            this.props.setBasePos('SET_BASE_POS', this.firePlatform.getBoundingClientRect().x)
    }

    lvlUp=( up= true)=>{
        if(!up) return {digits:1, box:1, lvl:0}

        let {lvl, box, digits} = this.props;
        if(box < 3) {
            box++;
        }else{
            lvl++;
            box = 1;
        }
        if(lvl > 2) lvl = 2;
        return {digits, box, lvl}
    }


    
    genWord=({lvl})=>{
        let choice = "words"
        switch (lvl) {
            case 1:
                choice = "long"
                break;
            case 2:
                choice = "hard"
                break;
            default:
                break;
        }
        Adapter.getWord(choice).then(r => r.json())
        .then(data => this.setState({            
            answer : data.word.word.toUpperCase(),
            def : data.word.def
        })).catch(this.setState({            
            answer : "db offline".toUpperCase(),
            def : "db offline"
        }))
    }


   collided = (bulletTime) =>{
       if(!this.state.checkingAns){
        let found = this.props.fired.find( e => e.time === bulletTime)
        this.setState({filledLetter: [...this.state.filledLetter, found.item]}, this.displayAnswer)

        let active = this.props.fired.filter( e => e.time !== bulletTime)
        this.props.updateFired("UPDATE_FIRE", active)
       }
   }

   checkAnswer=(userAns) => {
       console.log(this.props.userId)
       console.log("checking ans", userAns, this.state.filledLetter, this.state.answer)
        if( userAns!== this.state.answer){
            this.setState({filledLetter:[], userEq: [], userAns:null, hp: this.state.hp -20 }, ()=>{
                if(this.state.hp < 1) {
                    alert("GAME OVER!");
                    this.gameOver()
                }            
            })
            Adapter.patchWord(this.props.userId, this.state.answer).catch()

        }else{
            let data = this.lvlUp();
            this.props.setLevel(data);
            this.setState({filledLetter:[], hp: this.state.hp + 5})
            this.genWord(data);
            this.props.setScore(this.props.score + 10)
        }
    }

    displayAnswer=() =>{
        if(this.state.filledLetter.length >= numberOfVowels(this.state.answer) && this.state.answer.length > 0){
            let userAns = [];

            userAns = swapVowels(replaceVowel(this.state.answer), this.state.filledLetter)

            if(userAns.length > 0){
                console.log("user checking", userAns)
                this.setState({checkingAns: true , userAns},()=>{
                    setTimeout(() => {                        
                        this.setState({checkingAns:false }, ()=> this.checkAnswer(userAns));               
                        }, 4500);
                });
            }        
        }
    }

    resetGame = () => {
        let data = this.lvlUp(false)
        this.setState({
            hp:100,
        })
        this.genWord(data);
        this.props.setLevel(data);
        this.props.setScore(0);
    }

    gameOver=()=>{
        Adapter.postGame(this.props.userId, this.props.score)
        this.resetGame();
    }


   cycleOp=(keyup, level=this.props.lvl) => {
    let index = this.state.vowelIndex;
        if(keyup){
            index++;
        }else{
            index --;
        }

        if(index <0) index = 4
        index = index%5        
        this.setState({vowelIndex:index})
   }

   togglePos=(left, start)=>{
        let amt = 200,
            pos = this.props.basePos;
        if(left) pos -= amt;
        else pos += amt;
        if(pos> window.innerWidth-100) pos = window.innerWidth-100;
        if(pos < 0) pos =0;
        if(start) pos = window.innerWidth/2 -50 ;
        TweenLite.to(this.firePlatform, 2, {
        x: pos,
        onUpdate: this.setBasePosFn,
        repeat: -1,
        ease: Sine
      })              
   }


    handleKeyEvent=(event) => {
        
        const now = (new Date()).getTime();
        let active = this.props.fired
        if(this.props.fired.length > 0){
            active = this.props.fired.filter( e => (now - e.time)< 6000)
            this.props.updateFired("UPDATE_FIRE", active)
       }

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this.togglePos(true)
                break;

            case 'ArrowRight':
                event.preventDefault();
                this.togglePos(false)
                
                break;

            case 'ArrowDown':
                this.cycleOp(false)
                break;

            case 'ArrowUp':
                this.cycleOp(true)
                break;

            case ' ':
                if((now-this.props.lastFired) > 500){
                    this.props.setFired("FIRE_EVENT", [...active, this.projectile(now)], now)
                }
                break;
        
            default:
                break;
        }
    }

    
    flyRight =(el, amt, name, delay)=> {
        TweenMax.fromTo(el, amt, {
          y:100, 
          x: -300
        }, {
          x: window.innerWidth-300,
          y:100,
          rotation: 0,
          delay: delay, 
          onComplete:this.flyLeft,
          onCompleteParams:[el, amt, name, delay],
          ease: Power1.easeInOut
        });
      }

      flyLeft =(el, amt, name, delay)=> {
        TweenMax.fromTo(el, amt, {
          y:100, 
          x: window.innerWidth-300
        }, {
          x: -300,
          y:100,
          rotation: 0,
          delay: delay, 
          onComplete:this.flyRight,
          onCompleteParams:[el, amt, name, delay],
          ease: Power1.easeInOut
        });
      }
    
    projectile=(now)=>{
        return {data: <Bullet hit={false} 
        position={{x:0, y:70}} 
        qContainer = {this.refs.qContainer}
        startAt={this.props.basePos} 
        collided ={this.collided}
        item = {vowels[this.state.vowelIndex]}
        key={UUID()} 
        time={now}/>, 
        time:now,
        item:vowels[this.state.vowelIndex]
        }
    }

    showUserAns=()=>{
       let { userEq, userAns, answer } = this.state;
        return (
            <div className='userEqContainer'>
            
            <DisplayRW right={userAns === answer}/>
            </div>
        )
    }


    render() {
        const displayUserEq = this.state.checkingAns ? this.showUserAns() : null;
        const eq = this.state.answer ? replaceVowel(this.state.answer) :null;
        return (
            <div  id="gameContainer">       
                    <div  className= "fpContainer" ref={c => this.firePlatform = c}>
                    <FirePlatform x={55} y={10}  
                                op = {vowels[this.state.vowelIndex]}
                                key= "fireplatform__XD1"
                                setBasePos ={this.props.setBasePos}
                                togglePos={this.togglePos}
                    />
                    </div>
                
                <div className='questionContainer'  ref ="qContainer">
                <WordQuestion 
                filled = {this.state.filledLetter}
                eq = {eq}
                />
                </div>
                {this.props.fired.map(e => e.data)}

                {displayUserEq}
                <Instruction  hint={swapWords(this.state.def, this.state.answer)}/>
                
                <HpBar   completed={this.state.hp}/>
                {/* <Score score={this.state.score}/> */}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        basePos: state.basePos,
        fired: state.fired,
        lastFired: state.lastFired,
        digits: state.digits,
        box: state.box,
        lvl: state.lvl,
        userId: state.currentUserId,
        score: state.score,
    }
}

function mapDispathToProps(dispatch){
    return {
        setBasePos: (type, data) => dispatch({type, payload:{data} }),
        setQPos: (type, data) => dispatch({type, payload:{data} }),
        setFired: (type, data, time) => dispatch({type, payload:{data}, time}),
        updateFired: (type, data) => dispatch({type, payload:{data}}),
        clearBullet: (type, data) => dispatch({type, payload:{data}}),     
        setLevel: (data) => dispatch(setLevel(data)),   
    }
}

export default connect(mapStateToProps,mapDispathToProps)(GameContainer);