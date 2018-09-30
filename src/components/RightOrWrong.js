import React, { Component } from 'react';
import {Power1, TimelineLite, TweenLite, Elastic} from "gsap/TweenMax";


const textStyle = {
    fontFamily: "COURIER",
    fontSize: 80,
    fill: 'red',
    stroke: 'red',
    strokeWidth:'3px',
  };
  const rightStyle = {
    fontFamily: "COURIER",
    fontSize: 80,
    fill: 'green',
    stroke: 'green',
    strokeWidth:'3px',
  };
const yPos = -window.innerHeight /2 ;

class RightOrWrong extends Component {

    componentDidMount(){
        // console.log(this.container);
        
        TweenLite.fromTo(this.container, 2, 
            {x: 0,
            y:yPos,
            },
            {
            x: window.innerWidth/2 - 150,
            y:yPos,
            repeat: -1,
            rotation: 360,
            delay: 0, 
            ease: Elastic.easeOut.config(1, 0.3),
            onComplete: this.moveOut
        })
    }

    moveOut=()=>{
        TweenLite.fromTo(this.container, 2, 
            {x:window.innerWidth/2 -150,
            y:yPos},
            {
            x: window.innerWidth + 100,
            y: yPos,
            repeat: -1,
            ease: Power1.easeInOut
        })
    }

    shouldComponentUpdate(){
        return false;
    }
    
    right=()=>{
        return <text {...rightStyle} x={0} y={100}> Genius! </text>
    }

    
    wrong=()=>{
        return <text {...textStyle} x={0} y={100} > Idoit!</text>
    }

    render() {
        const toDisplay = this.props.right ? this.right() : this.wrong();
        return (
            <div className="wrContainer" ref={c => this.container = c}>
                <svg width="800" >
                    {toDisplay}
                </svg>
            </div>
        );
    }
}

export default RightOrWrong;