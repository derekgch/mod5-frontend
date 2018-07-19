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

    shouldComponentUpdate(nextProps){
        if(nextProps.hit) return true;
        return false;
    }

    render() {

        const textStyle = {
            fontFamily: "COURIER",
            fontSize: 120,
            fill: '#fffff',
          };

          const Move = styled.div`
          animation: ${moveHorizontally} 30s linear;
          position: absolute;
          top: 10vw;          
          left: 0vw;
        `;

        return (
            <Move>
            <svg >                
                <g>
                    <text x="-90" y="95" {...textStyle}>
                        1
                    </text>
                    <BlankBox/>

                    <text x="40" y="95" {...textStyle}>1=2  </text>                  
                    </g>
            </svg>
            </Move>
        );
    }
}

export default Question;