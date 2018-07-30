import React, { Component } from 'react';

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
    }

    componentDidMount(){
        this.countInterval = setInterval(this.countDown, 999)
    }
    componentWillUnmount(){
        clearInterval(this.countInterval);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.waiting !== this.props.waiting
        ||nextState.count !== this.state.count){
            return true;
        }
        return false;
    }
    
    countDown=()=>{
        if(this.state.count > 0 && !this.props.waiting)
            this.setState({count: this.state.count-1})
        
        if(this.state.count < 1){
            this.props.removeThis();
        }
    }

    render() {
        let toDisplay = this.props.waiting 
        ? 
        <text style={textStyle} x={300} y={110} alignment-baseline="middle" text-anchor="middle"
        >{`Waiting for other player...`} </text> 

        : <text style={numberStyle} x={300} y={110} alignment-baseline="middle" text-anchor="middle"
        >{this.state.count}</text>

        if(this.state.count === 0) {toDisplay = <text style={numberStyle} x={300} y={110} alignment-baseline="middle" text-anchor="middle"
        >{`Start!`} </text> }
        return (
            <div className="waitingScreen">
                <svg width="600">
                    {toDisplay}
                </svg>
            </div>
        );
    }
}

export default StartScreen;