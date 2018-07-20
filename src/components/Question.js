import React, { Component } from 'react';
import BlankBox from './BlankBox'

import styled, { keyframes } from 'styled-components';

const moveHorizontally = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(1000px);
  }
`;

class Question extends Component {
    constructor(props) {
        super(props);
        this.state={
            x: this.props.x,
            y: this.props.y,
        }
    }
    

    // shouldComponentUpdate(nextProps){
    //     if(nextProps.hit) return true;
    //     return false;
    // }

    render() {
        const now = (new Date()).getTime();

        const textStyle = {
            fontFamily: "COURIER",
            fontSize: 120,
            fill: '#fffff',
          };


        //   const Move = styled.div`
        //   animation: ${moveHorizontally} 30s linear;
        //   position: absolute;
        //   top: 10vw;          
        //   left: 0vw;
        // `;
        let eq = [3, "+", 1, "-", 1].slice(0);
        if(this.props.eq){eq = this.props.eq.slice(0);}
        // const ans = 5;
        const width = 110* eq.length;
        eq.push("=");
        eq.push(this.props.ans)
        let toRender = null;

        if(eq.length > 0){
            let i = 0;
            toRender= eq.map(el => {
                i++;
                if(typeof(el) === "number" || el === "=")
                    return <text x={i*60 - 30} y="95" {...textStyle} key={now-i} >{el}</text>
                else
                    return <BlankBox key={now-i} start={i*60 - 15}/>
            })
        }
        return (

            <svg width={width}>                
                <g>
                    {toRender}                  
                </g>
            </svg>

        );
    }
}

export default Question;