import React, { Component } from 'react';

const textStyle = {
    fontFamily: "COURIER",
    fontSize: 80,
    fill: '#fffff',
  };

class FirePlatform extends Component {

    shouldComponentUpdate(nextProps){
        if(nextProps.op !== this.props.op){
            return true;
        }
        return false;
    }

    translatePosition = (pX, pY) => {
        let size = 100;
        let angle = 30/180*Math.PI
        // let nextP ={x: Math.floor(pX+size/2), y: Math.floor(pY+Math.cos(angle)*size)} 
        // let lastP = {x: Math.floor(pX-size/2), y: Math.floor(pY+Math.cos(angle)*size)}
        let nextP ={x: Math.floor(pX+size), y: pY};
        let lastP ={x: Math.floor(pX+size/2), y:Math.floor(pY+Math.cos(angle)*size) } 

        return `M${pX} ${pY} L${nextP.x} ${nextP.y} L${lastP.x} ${lastP.y} Z`
    }


    render() {
        let testPath = this.translatePosition(this.props.x, this.props.y)
        let operator = this.props.op;
        if(operator === "/") operator ="÷"
        return (
            
            <svg width="110" height="110">
            <g>
                <path d={testPath}  fill="#888" stroke="#222" strokeWidth="5" />
                <text x={this.props.x+27} y={this.props.y+55} {...textStyle}>{operator}</text>
            </g>
            </svg>
            
        );
    }
}

export default FirePlatform;