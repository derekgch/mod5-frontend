import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import FirePlatform from '../FirePlatform';
import OtherPlayer from './OtherFirePlatform'
import { connect } from 'react-redux'
import Bullet from '../Bullet'
import { setLevel } from '../../actions';
import HpBar from '../HpBar';
import OtherHpBar from './OtherHPBar';
import StartScreen from './StartScreen'
import Question from './MultiQuestion'
import EndingScreen from './EndingScreen'


import Adapter from '../../Adapter'
import OtherBullet from './OtherBullet'

import UUID from 'uuid'
import { Power1, TimelineLite, TweenLite, Sine} from "gsap/TweenMax";
import { hardMath, calAnswer, ops } from "../GenerateQuestions";



const socket = openSocket('http://localhost:5000');


class multiContainer extends Component {

    constructor(props) {
        super(props);
        this.state={
            self: null,
            other:null,
            otherBullet:[],
            opIndex: 0,
            question: [],
            answer:null,
            correntOP:null,
            pause:false,
            started: false,
            winner:null,
        }

    }


    componentDidMount(){

        socket.emit("RESTART");
        socket.on("ALL_PLAYERS", data => this.getPlayers(data));
        socket.on("PLAYER_SELF", data=>this.updateSelf(data))
        socket.on("PLAYER_MOVED", data => this.updateOtherPlayer(data));
        socket.on("PLAYER_FIRED", data => this.updatePlayerFire(data));
        socket.on("PLAYER_HIT", data => this.getPlayers(data));
        socket.on("NEW_QUESTIONS", data => this.updateQuestion(data));
        socket.on("START_GAME", data =>  this.initGame(data));
        socket.on("GAME_OVER", data=> this.gameOver(data));
        socket.on("disconnect", data=> this.userDisconnected(data) );


        // console.log("Mount again or Did it?");
        // console.log(this.state.self, this.state.other)
        this.reportUsername();
        document.addEventListener("keydown", this.handleKeyEvent);
        this.togglePos(true, true);
        this.props.setLevel({digits: 1, box: 2, lvl: 2})
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyEvent);
        console.log("unmount event")
        // socket.emit("UNMOUNT")
    }


    initGame(data){
        this.reportQuestion()
        this.setState({started:data, pause:true})
    }
    runGame=()=>{
        if(this.state.started){
            this.setState({pause:false})
        }
    }



    gameOver=(data)=>{
        if(data.loser !== socket.id){
            console.log(this.state.self, this.state.other);
            this.setState({winner:true, pause: true})
            Adapter.postMulti({winner: this.state.self.userId, 
                                loser: this.state.other.userId,
                                winnerP: this.state.self.score,
                                loserP: this.state.other.score,
                            });
        }else{
            console.log("LOSER!")
            this.setState({winner:false, pause: true})
        }
    }

    resetGame=()=>{
        this.setState({ 
                        started:false, 
                        pause:false,
                        winner: null,
                        otherBullet:[],
                        opIndex: 0,
                        question: [],
                        answer:null,
                        correntOP:null,
                    })
        this.props.setScore(0);
    }


    getPlayers=(data)=>{
        Object.keys(data).forEach( (id)  => {
            if (data[id].playerId === socket.id) {
                console.log("self", id);
                this.setState({self:data[id]}, ()=>{
                    this.props.setScore(this.state.self.score)
                })
            } else {
                console.log("other",id);
                this.setState({other:data[id]})
            }
        })
    }

    userDisconnected=(data)=>{
        alert("user disconnected");
        this.resetGame();
    }

    removeBullet=(bulletTime)=>{
        let active = this.state.otherBullet.filter(e => e.time !== bulletTime)
        this.setState({otherBullet: [...active]})
    }

    genNewEq=(box=2, digits= 1)=>{
        let eq = [1, "+", 1];        
        eq = hardMath(digits, box);
        return eq;
    }


    setBasePosFn=()=>{
        if(this.firePlatform){    
            let posX = this.firePlatform.getBoundingClientRect().x*100 / window.innerWidth;
            this.props.setBasePos('SET_BASE_POS', posX)
            this.setState({self: {...this.state.self, x: posX}})
            this.reportSelfPos(posX)
        }
    }

    updateQuestion=(data)=>{
        console.log(data);
        
        let ans = calAnswer(data);
        if(!Number.isInteger(ans)) ans = parseFloat( ans.toPrecision(4) );
        this.setState({question:data, answer:ans})
    }

    updateSelf=(data)=>{
        this.setState({self: data})

    }

    updatePlayerFire=(data)=>{
        let now = (new Date()).getTime();
        let bullet= this.otherProjectile(data.bullet.time, data.bullet.op);
        let active = this.state.otherBullet.filter(e => (now - e.time) < 6000 )
            
        // console.log("bullets", bullet)
        this.setState({otherBullet: [...active, bullet]});
    }


    updateOtherPlayer=(data)=>{
        if(data && this.state.other && data.playerId ===this.state.other.playerId ){
            // console.log("updateother", data)
            this.setState({ other: data}, ()=>this.otherPlayerPos(data))
        }
    }

    reportUserReady=()=>{
        socket.emit("USER_READY", socket.id)
    }

    reportQuestion=()=>{
        socket.emit("GET_QUESTIONS", this.genNewEq())
    }

    reportPlayerHit=(op)=>{

        socket.emit("BULLET_HIT", {otherPlayer: this.state.other.playerId, op})
    }
    
    reportFireEvent=(time)=>{    
        socket.emit("FIRED", {time, op:ops[this.state.opIndex]})
    }

    reportSelfPos=(posX)=>{
        socket.emit("MOVED", {playerId:this.state.self.playerId, x:posX})
    }

    reportReady=()=>{
        socket.emit("USER_READY", socket.id);
    }
    reportUsername=()=>{
        if(this.props.userId){
            socket.emit("USER_ID", this.props.userId)
        }
    }

    togglePos=(left, start)=>{
        let amt = 200,
            pos = this.props.basePos * window.innerWidth / 100;
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

   otherPlayerPos=(otherPlayer)=>{
       let pos = window.innerWidth - otherPlayer.x* window.innerWidth/100 -100;
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


    cycleOp=(keyup, level=this.props.lvl) => {
        let index = this.state.opIndex;
            if(keyup){
                index++;
            }else{
                index --;
            }
            if(index <0) index = 3
            index = index%4
             
            this.setState({opIndex:index})
    }


   handleKeyEvent=(event) => {
    if(this.state.pause) return null;
            
    const now = (new Date()).getTime();
    let active = this.filterBullet(now);

    // console.log("self",this.state.self, "other",this.state.other);
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
            event.preventDefault();

            this.cycleOp(false)
            break;

        case 'ArrowUp':
            event.preventDefault();

            this.cycleOp(true)
            break;

        case ' ':
            event.preventDefault();

            if((now-this.props.lastFired) > 500){
                this.reportFireEvent(now);
                this.props.setFired("FIRE_EVENT", [...active, this.projectile(now)], now)
            }
            break;
    
        default:
            break;
        }
    }


    collided = (bulletTime, op) =>{
        if(!this.state.checkingAns){
        // let found = this.props.fired.find( e => e.time === bulletTime)
        // this.setState({filledOp: [...this.state.filledOp, found.item]}, this.displayAnswer)
        this.reportPlayerHit(op);
        let active = this.props.fired.filter( e => e.time !== bulletTime)
        this.props.updateFired("UPDATE_FIRE", active)
        }
    }


    collidedOther=(bulletTime)=>{
        if(!this.state.checkingAns){
            // let found = this.state.otherBullet.find( e => e.time === bulletTime)
            // this.setState({filledOp: [...this.state.filledOp, found.item]}, this.displayAnswer)
            let active = this.state.otherBullet.filter(e => e.time!== bulletTime)
            this.setState({otherBullet: [...active]})
            }
    }


    displayOtherBullet=()=>{
                
        return this.state.otherBullet.map(e => e.data);
    }

    otherProjectile=(now, op)=>{

        return {data: <OtherBullet hit={false}
        position={{x:0, y:70}} 
        qContainer = {this.firePlatform}
        startAt={window.innerWidth - 70 - this.state.other.x* window.innerWidth / 100} 
        collided ={this.collidedOther}
        item = {op}
        removeBullet = {this.removeBullet}
        key={`bullet${now}`}   
        time={now}/>, 
        time:now,
        item:op
        }        
    }

    projectile=(now)=>{
        
        return {data: <Bullet hit={false} 
        position={{x:0, y:70}} 
        qContainer = {this.otherPlayer}
        startAt={this.props.basePos * window.innerWidth / 100 +20} 
        collided ={this.collided}
        item = {ops[this.state.opIndex]}
        key={UUID()} 
        time={now}/>, 
        time:now,
        item:"+"
        }
    }

    startOrGameOver=()=>{
        if(this.state.started && !this.state.pause){  
            return <div className="multiPlayerQContainer" key={`multiPlayerQContainer`}> <Question eq={this.state.question} ans={this.state.answer} filled ={[]}/> </div>;
            
        }else if(this.state.winner !== null){
            return <EndingScreen key={`endingScreen`} winner={this.state.winner} resetGame={this.resetGame}/>
        }
        // return <EndingScreen winner={this.state.winner}/>
        return <StartScreen key={`StartScreen`} 
            waiting={!this.state.started} 
            runGame={this.runGame}
            getReady={this.reportReady}/>
    }


    render() {
        // console.log(this.state)
        return (
            <div>

                <div  className= "fpContainer" ref={c => this.firePlatform = c}>
                    <FirePlatform x={55} y={10}
                    op = {ops[this.state.opIndex]}                    
                    />
                </div>

                <div  className= "OtherPContainer" ref={c => this.otherPlayer = c}>
                    <OtherPlayer 
                        op = {'?'}
                        x={5} y={10}
                    />
                </div>
              
                {this.props.fired.map(e => e.data)}
                {this.displayOtherBullet()}
                <HpBar   completed={this.state.self? this.state.self.hp:100}/>
                <OtherHpBar   completed={this.state.other? this.state.other.hp:100}/>

                {this.startOrGameOver()}
           

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
        userName: state.currentUserName,
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