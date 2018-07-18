import React, { Component } from 'react';

class FirePlatform extends Component {
    translatePosition = (pX, pY) => {
        let size = 100;
        let angle = 30/180*Math.PI
        let nextP ={x: Math.floor(pX-size/2), y: Math.floor(pY+Math.cos(angle)*size)} 
        let lastP = {x: Math.floor(pX+size/2), y: Math.floor(pY+Math.cos(angle)*size)}
        return `M${pX} ${pY} L${nextP.x} ${nextP.y} L${lastP.x} ${lastP.y} Z`
    }


    render() {
        let testPath = this.translatePosition(500, 500)
        console.log(testPath)

        return (
            <React.Fragment>
                <path d={testPath}  fill="#FF8A65" stroke="#95a5a6" strokeWidth="5" />
            </React.Fragment>
        );
    }
}

export default FirePlatform;