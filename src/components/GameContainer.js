import React, { Component } from 'react';
import Question from './Question'
import FirePlatform from './FirePlatform'
import { connect } from 'react-redux'
import Bullet from './Bullet'
import UUID from 'uuid'
import {TweenMax, Power1, TimelineLite} from "gsap/TweenMax";
import { simpleMath, calAnswer, ops , swapOP} from "./GenerateQuestions";


class GameContainer extends Component {
    state = {
        opIndex: 0,
        question: null,
        answer: null,
        filledOp: [],
        box:2,
        userEq:[],
    }

    componentDidMount(){
        this.genNewEq();
        let qCnt = this.refs.qContainer;
        this.flyRight(qCnt, 15, "qContainer", 0.1);
        
    }

    genNewEq=()=>{
        let eq = simpleMath(1,this.state.box);
        let ans = calAnswer(eq);
        this.setState({question:eq, answer:ans, filledOp:[]})
    }


   collided = (bulletTime) =>{
    let found = this.props.fired.find( e => e.time === bulletTime)
    this.setState({filledOp: [...this.state.filledOp, found.op]}, this.checkAnswer)

    let active = this.props.fired.filter( e => e.time !== bulletTime)
    this.props.updateFired("UPDATE_FIRE", active)

   }

   checkAnswer=() => {
      if(this.state.filledOp.length >= this.state.box && this.state.question.length > 0){
        let userEq = swapOP(this.state.question, this.state.filledOp) 
            if(calAnswer(userEq) !== this.state.answer){
                this.setState({filledOp:[]})
            }else{
                this.genNewEq();
            }
        }
    }

   shouldComponentUpdate(nextProps, nextState){
   
    // if(this.state.filledOp.length >= this.state.box && this.state.eq.length > 0){
    //     let userEq = swapOP(this.state.eq, this.state.filledOp) 
    //     if(calAnswer(userEq) !== this.state.answer){
    //         this.setState({filledOp:[]})
    //     }else{
    //         this.genNewEq();
    //     }
    //     return true;
    // }else{
    //     return false;
    // }
    return true;
   }


   cycleOp=(keyup, level=0) => {
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
        this.setState({opIndex:index})
   }


    handleMove=(event) => {

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
                this.props.moveBasePos("MOVE_EVENT",{left:true, value:10})
                break;

            case 'ArrowRight':
                event.preventDefault();
                console.log("move right")
                this.props.moveBasePos("MOVE_EVENT",{left:false, value:10})
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
          x: 0
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
          x: 0,
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


    render() {
        let checkAnswer;
        console.log("useop",this.state.filledOp.length)
        

        return (
            <div tabIndex="0" onKeyDown={this.handleMove} id="gameContainer">
                <div>
                    <svg height="600" width="1000" >
        
                    <FirePlatform x={this.props.basePos} y={500}  
                                op = {ops[this.state.opIndex]}
                    />
                    </svg>
                </div>

                <div className='questionContainer'  ref ="qContainer">
                    <Question eq={this.state.question} ans={this.state.answer} filled={this.state.filledOp}/> 
                </div>
                {this.props.fired.map(e => e.data)}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        basePos: state.basePos,
        fired: state.fired,
        lastFired: state.lastFired
    }
}

function mapDispathToProps(dispatch){
    return {
        setBasePos: (type, data) => dispatch({type, payload:{data} }),
        moveBasePos: (type, data) => dispatch({type, payload:{data} }),
        setQPos: (type, data) => dispatch({type, payload:{data} }),
        setFired: (type, data, time, op) => dispatch({type, payload:{data}, time, op}),
        updateFired: (type, data) => dispatch({type, payload:{data}}),
        clearBullet: (type, data) => dispatch({type, payload:{data}}),
        
    }
}

export default connect(mapStateToProps,mapDispathToProps)(GameContainer);