import React, { Component } from 'react';
import { Power1, TweenLite, Sine} from "gsap/TweenMax";
import Button from '@material-ui/core/Button';



const textStyle = {
    fontFamily: "COURIER",
    fontSize: 30,
    fill: '#E35435',
  };

  const numberStyle = {
    fontFamily: "COURIER",
    fontSize: 100,
    fill: '#E35435',
  };

class StartScreen extends Component {
    state={
        count:3,
        ready:false,
    }


    componentWillUnmount(){
        this.clearIntervalFn();
    }

    clearIntervalFn=()=>{
        clearInterval(this.countInterval);
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.waiting!== this.props.waiting){
            if(!this.props.waiting)
                this.countInterval = setInterval(this.countDown, 999)   
                
            if(this.props.waiting)
                this.setState({ready:false})
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.waiting !== this.props.waiting
        ||nextState.count !== this.state.count
        ||nextState.ready !== this.state.ready){
            return true;
        }
        return false;
    }
    
    countDown=()=>{
        console.log("wwht")
        if(this.state.count > 0 && !this.props.waiting)
            this.setState({count: this.state.count-1})
        
        if(this.state.count < 1){
            this.clearIntervalFn();
            this.moveOutOfScreen();
            setTimeout(this.props.runGame, 2500)
        }
    }


    handleClick=()=>{
        
        this.setState({ready:true});
        this.props.getReady();
    }

    moveOutOfScreen=()=>{
        TweenLite.to(this.container, 3, {
            x: window.innerWidth + 100,
            ease: Sine,
            onComplete: this.clearIntervalFn,
            onCompleteParams: [],
        } )
    }


    toDisplay=()=>{
        if(this.state.ready){
            if(this.props.waiting){
              return (<text style={textStyle} x={300} y={110} alignmentBaseline="middle" textAnchor="middle"
                            >{`Waiting for other player...`} </text> )

            }else{
                if(this.state.count === 0) {
                    return (<text style={numberStyle} x={300} y={110} alignmentBaseline="middle" textAnchor="middle"
                    >{`Start!`} </text> )
                }


                return (<text style={numberStyle} x={300} y={110} alignmentBaseline="middle" textAnchor="middle"
                            >{this.state.count}</text>)
            }
        }else{
            return null;
        }
    }

    render() {

        let displayButton = this.state.ready? null 
            : <Button onClick={this.handleClick} style={{fontSize:30, fontFamily: "COURIER", color:"red"}}>READY!</Button>

        // console.log("ss", displayButton);
        
        return (
            <div className="waitingScreen" ref={c => this.container = c}>
                <svg width="600">
                    {this.toDisplay()}
                </svg>
                <div>
                    {displayButton}
                </div>
            </div>
        );
    }
}

export default StartScreen;