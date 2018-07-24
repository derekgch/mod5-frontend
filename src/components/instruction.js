import React, { Component } from 'react';


const textStyle = {
    fontFamily: "COURIER",
    fontSize: 20,
    fill: '#fffff',
  };

class instruction extends Component {
    shouldComponentUpdate(){
        return false;
    }
    render() {
        const textToDisplay = "<- -> : move   up down: cycle through operations  space: fire"
        return (
            <div className="insctructionDiv" >
                <svg width={window.innerWidth}>
                <text {...textStyle} x="0" y="130">
                    {textToDisplay}
                </text>
                </svg>
            </div>
        );
    }
}

export default instruction;