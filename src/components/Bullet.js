import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3000px);
  }
`;

const textStyle = {
    fontFamily: "COURIER",
    fontSize: 100,
    fill: '#fffff',
  };


class Bullet extends React.Component {
    shouldComponentUpdate(nextProps){
        if(nextProps.hit) return true;
        return false;
    }

    render() {

        const Move = styled.div`
        animation: ${moveVertically} 30s linear;
        position: absolute;
        bottom: 10vw;
        left: ${this.props.startAt}px;
      `;
        return (
            <Move>
                <svg width="70" height="70">
                <text
                style={textStyle}
                x={this.props.position.x}
                y={this.props.position.y}
                >
                +
                </text>
                </svg>
            </Move>
        );
    }
}



export default Bullet;