import React from 'react';
import {TweenMax, Power1, TimelineLite} from "gsap/TweenMax";


const textStyle = {
    fontFamily: "COURIER",
    fontSize: 100,
    fill: '#E35435',
  };


class OtherBullet extends React.Component {

    componentDidMount(){
        let bCnt = this.refs.bullet;
        this.flyDown(bCnt, 3, "bullet2", 0.1);
        this.interval = setInterval(this.isHit, 100); 
    }

    componentWillUnmount(){
        this.clearIntervalFn();   
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
            
        if( rect2.x+35 > rect1.x && rect2.x+35 < rect1.x+rect1.width
            && rect2.y+35 > rect1.y && rect2.y+35 < rect1.y+150
        ){ return true; }
        else { return false;}
    }

    clearIntervalFn = () => {
        clearInterval(this.interval)
    }

    flyDown = (el, amt, name, delay) => {
        TweenMax.fromTo(el, amt, {
            y: 0, 
            x: this.props.startAt,

          }, {
            x: this.props.startAt,
            y:1200,
            rotation: 0,
            delay: delay, 
            onComplete: this.props.removeBullet,
            onCompleteParams:[this.props.time],
            ease: Power1.easeInOut
          });
    }

    

    render() {
        let item = this.props.item;
        if(item === "/") item ="÷"
        return (
                <div className={`otherBullet ${this.props.time}`} ref="bullet">
                    <svg width="70" height="70">
                    <text
                    style={textStyle}
                    x={this.props.position.x}
                    y={this.props.position.y}
                    >
                    {item}
                    </text>
                    </svg>
                </div>
        );
    }
}



export default OtherBullet;