import React from 'react';
import styled, { keyframes } from 'styled-components';
import {TweenMax, Power1, TimelineLite} from "gsap/TweenMax";


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
    state={
        op: "+"
    }
    componentDidMount(){
        let bCnt = this.refs.bullet;
        this.flyUp(bCnt, 5, "bullet", 0.1);
        this.interval = setInterval(this.isHit, 100); 
    }

    shouldComponentUpdate(nextProps){
        // if(nextProps.hit) return true;
        return false;
    }


    isHit=()=>{
        if(this.refs.bullet){
            let qRect = this.props.qContainer.getBoundingClientRect();
            let bRect = this.refs.bullet.getBoundingClientRect();
            if(this.collisionDetetion(qRect, bRect)){
                this.props.collided(this.props.time)
            }
        }
    }

    collisionDetetion(rect1, rect2){
        // console.log("QQQ", rect1)
        // console.log("BBB", rect2)
            
        if( rect2.x+35 > rect1.x && rect2.x+35 < rect1.x+rect1.width
            && rect2.y+35 > rect1.y && rect2.y+35 < rect1.y+150
        ){ return true; }
        else { return false;}
    }

    clearIntervalFn = () => {
        clearInterval(this.interval)
    }

    flyUp = (el, amt, name, delay) => {
        TweenMax.fromTo(el, amt, {
            y: 500, 
            x: this.props.startAt,

          }, {
            x: this.props.startAt,
            y:-100,
            rotation: 0,
            delay: delay, 
            onComplete: this.clearIntervalFn,
            onCompleteParams:[el, amt, name, delay],
            ease: Power1.easeInOut
          });
    }

    

    render() {

    //     const Move = styled.div`
    //     animation: ${moveVertically} 30s linear;
    //     position: absolute;
    //     bottom: 10vw;
    //     left: ${this.props.startAt}px;
    //   `;
        return (
                <div className={`bullet ${this.props.time}`} ref="bullet">
                    <svg width="70" height="70">
                    <text
                    style={textStyle}
                    x={this.props.position.x}
                    y={this.props.position.y}
                    >
                    {this.props.op}
                    </text>
                    </svg>
                </div>
        );
    }
}



export default Bullet;