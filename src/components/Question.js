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
    totalWidth(eq){
        let result =0;
        eq.forEach(el => {
            result+=  typeof(el) === "number" ? getDigits(el)*65 : 65
        });
        return result;
    }

    questionToRender=(eq, filled)=>{
        const now = (new Date()).getTime();
        console.log("eq and ans", this.props.eq, this.props.ans)

        let i = 0;
        let endPoint =0;
        let startPoint =0;
        return  eq.map(el => {
            i++;
            startPoint =endPoint;
            if(typeof(el) === "number"){
                endPoint = getDigits(el)*63 +startPoint;
            }else {
                endPoint = startPoint+ 63;
            }
            if(typeof(el) === "number" || el === "="){
                return <text x={startPoint} y="95" {...textStyle} key={now-i} >{el}</text>
            }else{
                if(filled.length >0){
                    return <text x={startPoint} y="95" {...textStyle} key={now-i} >{filled.shift()}</text>                    
                }else
                    return <BlankBox key={now-i} start={startPoint+15}/>
            }
        })        
    }

    render() {
        let eq = [3, "+", 1, "-", 1];
        let filled = [];

        if(this.props.eq){eq = this.props.eq.slice(0);}
        if(this.props.filled.length>0) filled = this.props.filled.slice(0);
        eq.push("=");
        eq.push(this.props.ans)

        const toRender = this.questionToRender(eq, filled);
        const width = this.totalWidth(eq)
        return (
            <svg width={width} viewBox={`0 0 ${width} 130`} >                
                <g>
                    {toRender}                  
                </g>
            </svg>

        );
    }
}

export default Question;