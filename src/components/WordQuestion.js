import React, { Component } from 'react';
import BlankBox from './BlankBox'
import { getDigits } from './GenerateQuestions'


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
    

    shouldComponentUpdate(nextProps){
        if(nextProps.filled.length !== this.props.filled.length 
            || nextProps.eq !== this.props.eq
            || nextProps.ans !== this.props.ans ) return true;
        return false;
    }

    totalWidth(eq){
        return eq.length*65;
    }

    questionToRender=(eq, filled)=>{
        const now = (new Date()).getTime();
        console.log("Word:", this.props.eq)

        let i = 0;
        let startPoint =0;
        return  eq.split("").map(el => {
            startPoint = i*63;
            i++;
            
            if(el !== "_"  ){
                return <text x={startPoint} y="95" {...textStyle} key={now-i} >{el}</text>
            }else{
                if(filled.length >0){
                    let item = filled.shift();
                    return <text x={startPoint} y="95" {...textStyle} key={now-i} >{item}</text>                    
                }else
                    return <BlankBox key={now-i} start={startPoint+15}/>
            }
        })        
    }

    render() {
        let eq = "ab";
        let filled = [];

        if(this.props.eq){eq = this.props.eq.slice(0);}
        if(this.props.filled.length>0) filled = this.props.filled.slice(0);


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