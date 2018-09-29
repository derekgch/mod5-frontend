import React, { Component } from 'react';
import KeyBoard from '../img/keyboard.png';
import k1 from '../img/sd.png'
import GameContainer from './GameContainer';


class info extends Component {
    render() {
        return (
            <div className="instructionKeyBoard" >
                <GameContainer 
                            score = {this.props.score}
                            setScore={this.props.setScore}/>
                <img src={k1} style={{}} className="strech" />
            </div>
        );
    }
}

export default info;