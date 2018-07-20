import React, { Component } from 'react';
import Question from './Question'
import FirePlatform from './FirePlatform'
import { connect } from 'react-redux'
import Bullet from './Bullet'
import UUID from 'uuid'

class GameContainer extends Component {

    handleMove=(event) => {
        // console.log(event.key)
        let left = document.getElementsByClassName("questionContainer")
        debugger
        console.log("pos", left)

        const now = (new Date()).getTime();
        let active = this.props.fired
        if(this.props.fired.length > 0){
            active = this.props.fired.filter( e => (now - e.time)< 5000)
            this.props.updateFired("UPDATE_FIRE", active)
       }

       console.log(this.a.getBoundingClientRect())
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

            break;
            case 'ArrowUp':
            console.log("move up")

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
    
    projectile=(now)=>{
        return {data: <Bullet hit={false} position={{x:0, y:70}} startAt={this.props.basePos} key={UUID()}/>, time:now}
    }

    handleRefs = (el) => {
        console.log("ref here")

        console.log(this.a.getBoundingClientRect())
        console.log(el.getBoundingClientRect())

    }

    render() {
        // style={{border: "1px solid #2196F3"}}
        console.log("render?",this.props.fired)
        return (
            <div tabIndex="0" onKeyDown={this.handleMove}>
                <div>
                    <svg height="600" width="1000" >
                    <FirePlatform x={this.props.basePos} y={500}
                    />
                    </svg>
                </div>

                <div className='questionContainer'  ref ={el => this.a = el}>
                    <Question /> 
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
        setBasePos: (type, data) => dispatch({type: type, payload:{data} }),
        moveBasePos: (type, data) => dispatch({type: type, payload:{data} }),
        setQPos: (type, data) => dispatch({type: type, payload:{data} }),
        setFired: (type, data, time) => dispatch({type: type, payload:{data}, time}),
        updateFired: (type, data) => dispatch({type, payload:{data}})
        
    }
}

export default connect(mapStateToProps,mapDispathToProps)(GameContainer);