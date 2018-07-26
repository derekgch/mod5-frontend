import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import FirePlatform from '../FirePlatform';
import OtherPlayer from './OtherFirePlatform'
import { connect } from 'react-redux'
import Bullet from '../Bullet'
import { setLevel } from '../../actions';
import HpBar from '../HpBar';
import Adapter from '../../Adapter'

import UUID from 'uuid'
import {TweenMax, Power1, TimelineLite, TweenLite, Sine} from "gsap/TweenMax";
import { simpleMath, multiplyMath, hardMath, calAnswer, ops , swapOP} from "../GenerateQuestions";




const  socket = openSocket('http://localhost:5000');


class multiContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:"sdssww",
            self: null,
            players:null,
        }
    }


    componentDidMount(){

        socket.on("ALL_PLAYERS", (data) => this.getPlayers(data));
        document.addEventListener("keydown", this.handleKeyEvent);
    }




    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyEvent);
    }

    getPlayers=(data)=>{
        Object.keys(data).forEach( (id)  => {
            if (data[id].playerId === socket.id) {
                console.log("sef", id);
                
            } else {
                console.log("other",id);
            }
    })
}
    
    handleClick=(event)=>{
        event.preventDefault();
        socket.emit('SEND_MESSAGE', this.state.message )
        socket.on("RECEIVE_MESSAGE", (data)=>{
            this.setState({
                message: data
            })
        })
    }

    setBasePosFn=()=>{
        if(this.firePlatform)    
            this.props.setBasePos('SET_BASE_POS', this.firePlatform.getBoundingClientRect().x)
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
            // console.log(event.key)
            this.togglePos(true)
            break;

        case 'ArrowRight':
            event.preventDefault();
            this.togglePos(false)
            
            break;

        case 'ArrowDown':
            // this.cycleOp(false)
            break;

        case 'ArrowUp':
            // this.cycleOp(true)
            break;

        case ' ':
            if((now-this.props.lastFired) > 500){
                // this.props.setFired("FIRE_EVENT", [...active, this.projectile(now)], now)
            }
            break;
    
        default:
            break;
    }
}


    render() {
        // console.log(this.state)
        return (
            <div>
                <button onClick={this.handleClick}>Click Me</button>
                {this.state.message}
                <div  className= "fpContainer" ref={c => this.firePlatform = c}>
                    <FirePlatform x={55} y={10}
                    setBasePos ={this.props.setBasePos}
                    togglePos={this.togglePos}
                    
                    />
                </div>

                <div  className= "OtherPContainer" ref={c => this.otherPlayer = c}>
                    <OtherPlayer 
                        x={55} y={10}
                        setBasePos ={this.props.setBasePos}
                    />
                </div>
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

export default connect(mapStateToProps,mapDispathToProps)(multiContainer);