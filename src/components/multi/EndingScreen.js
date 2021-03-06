import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


const textStyle = {
    fontFamily: "COURIER",
    fontSize: 100,
    fill: '#fffff',
  };

class EndingScreen extends Component {

    handleClick=()=>{
        this.props.resetGame()
    }


    render() {
        const toDisplay = this.props.winner ? "You Won!" : "You Lost!"
        return (
            <div className="waitingScreen">
                <svg width="600">
                    <text
                    style={textStyle}
                    y={60}
                    >
                    {toDisplay}
                    </text>
                </svg>
            <Button onClick={this.handleClick} style={{fontSize:30, fontFamily: "COURIER", color:"red"}}>PLAY AGAIN</Button>
            </div>
        );
    }
}

export default EndingScreen;