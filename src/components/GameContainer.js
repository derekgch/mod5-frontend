import React, { Component } from 'react';
import Question from './Question'
import FirePlatform from './FirePlatform'

class GameContainer extends Component {
    render() {


        return (
            <div>
                <svg height="600" width="1000" style={{border: "1px solid #2196F3"}}>

                <Question />
                <FirePlatform x={150} y={900} />
                </svg>
            </div>
        );
    }
}

export default GameContainer;