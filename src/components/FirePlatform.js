import React, { Component } from 'react';

const textStyle = {
    fontFamily: "COURIER",
    fontSize: 80,
    fill: '#fffff',
  };

class FirePlatform extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.op !== this.props.op){
            return true;
        }
        return false;
    }

    translatePosition = (pX, pY) => {
        let size = 120;
        let angle = 30/180*Math.PI
        let nextP ={x: Math.floor(pX-size/2), y: Math.floor(pY+Math.cos(angle)*size)} 
        let lastP = {x: Math.floor(pX+size/2), y: Math.floor(pY+Math.cos(angle)*size)}
        return `M${pX} ${pY} L${nextP.x} ${nextP.y} L${lastP.x} ${lastP.y} Z`
    }


    render() {
        let testPath = this.translatePosition(this.props.x, this.props.y)
        let operator = this.props.op;
        if(operator === "/") operator ="÷"
        return (
            
            <svg width="140" height="120">
            <g>
                <path d={testPath}  fill="#FF8A65" stroke="#95a5a6" strokeWidth="5" />
                <text x={this.props.x-23} y={this.props.y+90} {...textStyle}>{operator}</text>
            </g>
            </svg>
            
        );
    }
}

export default FirePlatform;