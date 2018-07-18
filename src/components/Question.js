import React, { Component } from 'react';
import BlankBox from './BlankBox'

class Question extends Component {

    amine =(start,time="10s") => {
        return <animate attributeType="XML" attributeName="x" from={start} to={start+200} dur={time} repeatCount="indefinite"/>
    } 


    render() {
        let question = "1+1 =2"
        let posX, posY
        const textStyle = {
            fontFamily: "COURIER",
            fontSize: 120,
            fill: '#fffff',
          };


        return (
            <React.Fragment>
                <g>
                    {/* <path d="M 20 20 C 20 110, 110 110, 110 20" stroke="green" fill="transparent"/>

                    <path d="M 20 20 V 80 H 50" stroke="black" stroke-width="2" fill="transparent" />
                    

                    <svg>
                    <circle cx={100} cy={100} r={2} />
                    </svg> */}
                    <g  >
                    <text x="-90" y="95" {...textStyle}>
                        1  {this.amine(-90)}
                    </text>
                    <BlankBox start={-15}/>

                    <text x="40" y="95" {...textStyle}>1=2  {this.amine(40)}</text>
                    
                    </g>

                
                {/* <g fill="white" stroke="green" stroke-width="5">
                    <circle cx="40" cy="100" r="2" />
                    <circle cx="60" cy="60" r="5" />
                </g> */}
                </g>
                
            </React.Fragment>
        );
    }
}

export default Question;