import React, { Component } from 'react';
import KeyBoard from '../img/keyboard.png';
import GameContainer from './GameContainer';


class info extends Component {
    render() {
        return (
            <div className="instructionKeyBoard" >
                <GameContainer 
                            score = {this.props.score}
                            setScore={this.props.setScore}/>
                <img src={KeyBoard} height="60%" />
            </div>
        );
    }
}

export default info;