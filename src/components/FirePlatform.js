import React, { Component } from 'react';

const textStyle = {
    fontFamily: "COURIER",
    fontSize: 80,
    fill: '#fffff',
  };

class FirePlatform extends Component {

    translatePosition = (pX, pY) => {
        let size = 100;
        let angle = 30/180*Math.PI
        let nextP ={x: Math.floor(pX-size/2), y: Math.floor(pY+Math.cos(angle)*size)} 
        let lastP = {x: Math.floor(pX+size/2), y: Math.floor(pY+Math.cos(angle)*size)}
        return `M${pX} ${pY} L${nextP.x} ${nextP.y} L${lastP.x} ${lastP.y} Z`
    }


    render() {
        let testPath = this.translatePosition(this.props.x, this.props.y)
        console.log(testPath)

        return (
            
            <svg width="110" height="110">
            <g>
                <path d={testPath}  fill="#FF8A65" stroke="#95a5a6" strokeWidth="5" />
                <text x={this.props.x-25} y={this.props.y+80} {...textStyle}>{this.props.op}</text>
            </g>
            </svg>
            
        );
    }
}

export default FirePlatform;