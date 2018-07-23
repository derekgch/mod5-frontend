import React, { Component } from 'react';
import Question from './Question'
import FirePlatform from './FirePlatform'
import { connect } from 'react-redux'
import Bullet from './Bullet'
import Instruction from './instruction'
import DisplayRW from './RightOrWrong'


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
        checkingAns: false
    }

    componentDidMount(){
        this.genNewEq();
        let qCnt = this.refs.qContainer;
        this.flyRight(qCnt, 15, "qContainer", 0.1);
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


    genNewEq=()=>{
        let eq = [1, "+", 1];
        let ans;
        if(this.props.lvl === 0)
            eq = simpleMath(this.props.digits, this.props.box);
        if(this.props.lvl === 1 )
            eq = multiplyMath(this.props.digits, this.props.box);
        ans = calAnswer(eq);

        if(this.props.lvl === 2){
            eq = hardMath(this.props.digits, this.props.box);
            ans = calAnswer(eq);
            if(!Number.isInteger(ans)) ans = parseFloat( ans.toPrecision(4) );
        }         
        this.setState({question:eq, answer:ans, filledOp:[]})
    }


   collided = (bulletTime) =>{
    let found = this.props.fired.find( e => e.time === bulletTime)
    this.setState({filledOp: [...this.state.filledOp, found.op]}, this.displayAnswer)

    let active = this.props.fired.filter( e => e.time !== bulletTime)
    this.props.updateFired("UPDATE_FIRE", active)

   }

   checkAnswer=(userAns) => {
        if( userAns!== this.state.answer){
            this.setState({filledOp:[], userEq: [], userAns:null })
        }else{
            this.genNewEq();
        }
    }

    displayAnswer=() =>{
        if(this.state.filledOp.length >= this.props.box && this.state.question.length > 0){
            let userEq = swapOP(this.state.question, this.state.filledOp) 
            let userAns =calAnswer(userEq);
            if(!Number.isInteger(userAns)) userAns = parseFloat (userAns.toPrecision(4));
            this.setState({checkingAns: true, userEq , userAns});
            setTimeout(() => {
            this.checkAnswer(userAns); 
            this.setState({checkingAns:false });               
            }, 4500);
        }
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
        if(start) pos = window.innerWidth/2 -50 ;
        TweenLite.to(this.firePlatform, 2, {
        x: pos,
        onUpdate: this.setBasePosFn,
        repeat: -1,
        ease: Sine
      })
              
   }

    handleKeyEvent=(event) => {
        // console.log(this.firePlatform.getBoundingClientRect().x);
        
        const now = (new Date()).getTime();
        let active = this.props.fired
        if(this.props.fired.length > 0){
            active = this.props.fired.filter( e => (now - e.time)< 6000)
            this.props.updateFired("UPDATE_FIRE", active)
       }

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                console.log("move left")
                this.togglePos(true)
                break;

            case 'ArrowRight':
                event.preventDefault();
                console.log("move right")
                this.togglePos(false)
                
                break;

            case 'ArrowDown':
                console.log("move down")
                this.cycleOp(false)
                break;

            case 'ArrowUp':
                console.log("move up")
                this.cycleOp(true)
                break;

            case ' ':
                console.log("space")
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
        op = {ops[this.state.opIndex]}
        key={UUID()} 
        time={now}/>, 
        time:now,
        op:ops[this.state.opIndex]
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
                    <FirePlatform x={55} y={10}  
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
        lvl: state.lvl
    }
}

function mapDispathToProps(dispatch){
    return {
        setBasePos: (type, data) => dispatch({type, payload:{data} }),
        setQPos: (type, data) => dispatch({type, payload:{data} }),
        setFired: (type, data, time, op) => dispatch({type, payload:{data}, time, op}),
        updateFired: (type, data) => dispatch({type, payload:{data}}),
        clearBullet: (type, data) => dispatch({type, payload:{data}}),        
    }
}

export default connect(mapStateToProps,mapDispathToProps)(GameContainer);