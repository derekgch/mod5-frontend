import React, { Component } from 'react';
import BlankBox from './BlankBox'
import { getDigits } from './GenerateQuestions'
import styled, { keyframes } from 'styled-components';

const moveHorizontally = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(1000px);
  }
`;

const textStyle = {
    fontFamily: "COURIER",
    fontSize: 120,
    fill: '#fffff',
  };

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

            //   const Move = styled.div`
        //   animation: ${moveHorizontally} 30s linear;
        //   position: absolute;
        //   top: 10vw;          
        //   left: 0vw;
        // `;

    render() {
        const now = (new Date()).getTime();

        console.log("eq and ans", this.props.eq, this.props.ans)

        let eq = [3, "+", 1, "-", 1];
        let toRender = null;
        let i = 0;
        let digits = 0;
        let filled = [];

        if(this.props.eq){eq = this.props.eq.slice(0);}
        // const ans = 5;
        eq.push("=");
        eq.push(this.props.ans)

        if(this.props.filled.length>0) filled = this.props.filled.slice(0);

        if(eq.length > 0){
            toRender= eq.map(el => {
                i++;
                if(typeof(el) === "number" || el === "="){
                    if(el !== "=")digits += (getDigits(el)-1)
                    return <text x={i*60 - 30} y="95" {...textStyle} key={now-i} >{el}</text>
                }else{
                    if(filled.length >0){
                        return <text x={i*60 - 30} y="95" {...textStyle} key={now-i} >{filled.shift()}</text>
                        
                    }else
                        return <BlankBox key={now-i} start={i*60 - 15}/>
                }
            })
        }
        console.log(filled)
        const width = 67* (eq.length+digits);
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