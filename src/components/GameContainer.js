import React, { Component } from 'react';
import Question from './Question'
import FirePlatform from './FirePlatform'
import { connect } from 'react-redux'
import Bullet from './Bullet'
import Instruction from './instruction'
import DisplayRW from './RightOrWrong'
import { setLevel } from '../actions';
import HpBar from './HpBar';
import Adapter from '../Adapter'


import UUID from 'uuid'
import {TweenMax, Power1, TimelineLite, TweenLite, Sine} from "gsap/TweenMax";
import { simpleMath, multiplyMath, hardMath, calAnswer, ops , swapOP} from "./GenerateQuestions";


class GameContainer extends Component {
    state = {
        opIndex: 0,
        question: null,
        answer: null,
        filledOp: [],
        userEq:[],
        userAns: null,
        checkingAns: false,
        hp:100,
    }

    componentDidMount(){
        this.props.updateFired("UPDATE_FIRE", []);
        // this.filterBullet((new Date()).getTime());
        this.props.setScore(0);
        this.genNewEq(this.props);
        let qCnt = this.refs.qContainer;
        this.flyLeft(qCnt, 12, "qContainer", 0.1);
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
        let {digits, box, lvl} = this.props;
        let data ={digits, box, lvl};

        if(!up){
            data.digits = 1;
            data.box = 1;
            data.lvl =0;
            return data;
        }

        if(this.props.box < 3){
            data.box++;
            return data;
        }else if(this.props.lvl < 2) {
            data.lvl++;
            data.box =1;
            return data;
        } else{
            data.digits++;
            data.box =1;
            data.lvl =0;
            return data;
        }
    }


    genNewEq=({box, lvl, digits})=>{
        let eq = [1, "+", 1];
        let ans;
        console.log("this.props.box", box)
        if(lvl === 0)
            eq = simpleMath(digits, box);
        if(lvl === 1 )
            eq = multiplyMath(digits, box);
        ans = calAnswer(eq);

        if(lvl === 2){
            eq = hardMath(digits, box);
            ans = calAnswer(eq);
            if(!Number.isInteger(ans)) ans = parseFloat( ans.toPrecision(4) );
        }         
        this.setState({question:eq, answer:ans, filledOp:[]})
    }


   collided = (bulletTime) =>{
       if(!this.state.checkingAns){
        let found = this.props.fired.find( e => e.time === bulletTime)
        this.setState({filledOp: [...this.state.filledOp, found.item]}, this.displayAnswer)

        let active = this.props.fired.filter( e => e.time !== bulletTime)
        this.props.updateFired("UPDATE_FIRE", active)
       }
   }

   checkAnswer=(userAns) => {
       console.log("checking ans", userAns, this.state.filledOp, this.state.question)
        if( userAns!== this.state.answer){
            this.setState({filledOp:[], userEq: [], userAns:null, hp: this.state.hp -20 }, ()=>{
                if(this.state.hp < 1) {
                    alert("GAME OVER!");
                    this.gameOver()
                }            
            })
        }else{
            let data = this.lvlUp();
            let hp = this.state.hp + 5;
            if(hp > 100) hp =100;
            this.props.setLevel(data);
            this.props.setScore(this.props.score+10)
            this.setState({hp});
            this.genNewEq(data);

        }
    }

    displayAnswer=() =>{
        if(this.state.filledOp.length >= this.props.box && this.state.question.length > 0){
            let userEq = swapOP(this.state.question, this.state.filledOp) 
            let userAns =calAnswer(userEq);
            if(!Number.isInteger(userAns)) userAns = parseFloat (userAns.toPrecision(4));
            if(userEq.length > 0){
                console.log("user checking")
                this.setState({checkingAns: true, userEq , userAns},()=>{
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
        this.genNewEq(data);
        this.props.setLevel(data);
        this.props.setScore(0);
    }

    gameOver=()=>{
        Adapter.postGame(this.props.userId, this.props.score)
        this.resetGame();
    }


   cycleOp=(keyup, level=this.props.lvl) => {
    let index = this.state.opIndex;
        if(keyup){
            index++;
        }else{
            index --;
        }

        if(level === 0){ //only + and - operations
            if(index <0) index = 1
            index = index%2
        }

        if(level === 1){ // only +, -, and * operations
            if(index <0) index = 2
            index = index%3
        }      
        
        if(level === 2){ //  +, -, * and / operations
            if(index <0) index = 3
            index = index%4
        } 
        this.setState({opIndex:index})
   }

   togglePos=(left, start)=>{
        let amt = 200,
            pos = this.props.basePos;
        if(left) pos -= amt;
        else pos += amt;
        if(pos> window.innerWidth-100) pos = window.innerWidth-100;
        if(pos < 0) pos =0;
        if(start) pos = window.innerWidth*0.615 -50 ;
        TweenLite.to(this.firePlatform, 2, {
        x: pos,
        onUpdate: this.setBasePosFn,
        repeat: -1,
        ease: Sine
      })              
   }


   filterBullet=(now)=>{
    let active = this.props.fired
    if(this.props.fired.length > 0){
        active = this.props.fired.filter( e => (now - e.time)< 6000)
        this.props.updateFired("UPDATE_FIRE", active)
   }
   return active;
   }

    handleKeyEvent=(event) => {
        
        const now = (new Date()).getTime();
        let active = this.filterBullet(now)

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

            case 'Backspace':
                this.removeFilled();
                break;
        
            default:
                break;
        }
    }

    removeFilled=()=>{
        this.setState({filledOp:[]})
    }

    
    flyRight =(el, amt, name, delay)=> {
        TweenMax.fromTo(el, amt, {
          y:100, 
          x: -100
        }, {
          x: window.innerWidth-200,
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
          x: window.innerWidth-200
        }, {
          x: -100,
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
        item = {ops[this.state.opIndex]}
        key={UUID()} 
        time={now}/>, 
        time:now,
        item:ops[this.state.opIndex]
        }
    }

    showUserAns=()=>{
       let { userEq, userAns, answer } = this.state;
        return (
            <div className='userEqContainer'>
            <Question eq={userEq} 
            ans={userAns} 
            filled={this.state.filledOp}
            
            /> 
            <DisplayRW right={userAns === answer}/>
            </div>
        )
    }


    render() {
        const displayUserEq = this.state.checkingAns ? this.showUserAns() : null;
        return (
            <div  id="gameContainer">     
                

                    <div  className= "fpContainer" ref={c => this.firePlatform = c}>
                    <FirePlatform x={65} y={10}  
                                op = {ops[this.state.opIndex]}
                                key= "fireplatform__XD1"
                                setBasePos ={this.props.setBasePos}
                                togglePos={this.togglePos}
                    />
                    </div>
                
                <div className='questionContainer'  ref ="qContainer">
                    <Question eq={this.state.question} 
                    ans={this.state.answer} 
                    filled={this.state.filledOp}
                    
                    /> 
                </div>
                {this.props.fired.map(e => e.data)}

                {displayUserEq}
                <Instruction />
                <HpBar   completed={this.state.hp}/>
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
        setFired: (type, data, time, op) => dispatch({type, payload:{data}, time, op}),
        updateFired: (type, data) => dispatch({type, payload:{data}}),
        clearBullet: (type, data) => dispatch({type, payload:{data}}),     
        setLevel: (data) => dispatch(setLevel(data)),   
    }
}

export default connect(mapStateToProps,mapDispathToProps)(GameContainer);