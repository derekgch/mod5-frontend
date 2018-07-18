import React, { Component } from 'react';

class GameContainer extends Component {
    render() {
        return (
            <div>
                <svg height="200" width="300" style={{border: "1px solid #16a085"}} viewBox="0 0 100 100">
                    <path d="M 20 20 C 20 110, 110 110, 110 20" stroke="green" fill="transparent"/>

                    <path d="M 20 20 V 80 H 50" stroke="black" stroke-width="2" fill="transparent" />
                    </svg>

                    <svg>
                    <circle cx={100} cy={100} r={50} />
                    </svg>

                <svg>
                <g fill="white" stroke="green" stroke-width="5">
                    <circle cx="40" cy="100" r="25" />
                    <circle cx="60" cy="60" r="25" />
                </g>
                </svg> 
            </div>
        );
    }
}

export default GameContainer;