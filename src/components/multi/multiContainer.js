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
            other:null,
        }
    }


    componentDidMount(){

        socket.on("ALL_PLAYERS", (data) => this.getPlayers(data));
        socket.on("PLAYER_MOVED", data => this.updateOtherPlayer(data));
        document.addEventListener("keydown", this.handleKeyEvent);
        this.togglePos(true, true);
    }


    componentDidUpdate(){

    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyEvent);
    }




    getPlayers=(data)=>{
        Object.keys(data).forEach( (id)  => {
            if (data[id].playerId === socket.id) {
                console.log("sef", id);
                this.setState({self:data[id], other:data[id]})
            } else {
                console.log("other",id);
                // this.setState({other:data[id]})
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
        if(this.firePlatform){    
            let posX = this.firePlatform.getBoundingClientRect().x;
            this.props.setBasePos('SET_BASE_POS', posX)
            this.setState({self: {...this.state.self, x: posX}})
            this.reportSelfPos(posX)
        }
    }

    updateOtherPlayer=(data)=>{
        if(data&& data.playerId ===this.state.other.playerId ){
            this.setState({ other: data}, ()=>this.otherPlayerPos(data))
        }
    }
    

    reportSelfPos=(posX)=>{
        socket.emit("MOVED", {playerId:this.state.self.playerId, x:posX})
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

   otherPlayerPos=(otherPlayer)=>{
       let pos = window.innerWidth - otherPlayer.x-100;
        TweenLite.to(this.otherPlayer, 2, {
            x: pos,
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

    console.log("self",this.state.self, "other",this.state.other);
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
                this.props.setFired("FIRE_EVENT", [...active, this.projectile(now)], now)
            }
            break;
    
        default:
            break;
        }
    }


    collided = (bulletTime) =>{
        if(!this.state.checkingAns){
        let found = this.props.fired.find( e => e.time === bulletTime)
        // this.setState({filledOp: [...this.state.filledOp, found.item]}, this.displayAnswer)

        let active = this.props.fired.filter( e => e.time !== bulletTime)
        this.props.updateFired("UPDATE_FIRE", active)
        }
    }

    projectile=(now)=>{
        return {data: <Bullet hit={false} 
        position={{x:0, y:70}} 
        qContainer = {this.otherPlayer}
        startAt={this.props.basePos} 
        collided ={this.collided}
        item = {'+'}
        key={UUID()} 
        time={now}/>, 
        time:now,
        item:"+"
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
                    op = {'+'}                    
                    />
                </div>

                <div  className= "OtherPContainer" ref={c => this.otherPlayer = c}>
                    <OtherPlayer 
                        op = {'+'}

                        x={5} y={10}
                    />
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