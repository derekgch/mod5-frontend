import React, { Component } from 'react';


const textStyle = {
    fontFamily: "COURIER",
    fontSize: 80,
    fill: 'white',
    stroke: 'black',
    strokeWidth:'3px',

  };

class Scores extends Component {
    shouldComponentUpdate(nextProps){
        if(nextProps.score !== this.props.score)
            return true;
        return false;
    }
    render() {
        return (
            <div className="scoreContainer">
                <svg width="150" height="120" >
                    <text {...textStyle} x={0} y={100} >{this.props.score}</text>
                </svg>
            </div>
        );
    }
}

export default Scores;