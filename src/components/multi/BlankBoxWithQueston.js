import React, { Component } from 'react';


const textStyle = {
    fontFamily: "COURIER",
    fontSize: 70,
    fill: '#8d7f32',
  };


class BlankBoxWithQueston extends Component {
    shouldComponentUpdate(){
        return false;
    }


    render() {
        return (
            <React.Fragment>
                
                <rect  x={this.props.start} y="35" height="50" width="50" fill="none" stroke="#ff8a65" strokeWidth="4">
                
                </rect>
                <text
                    style={textStyle}
                    y='82'
                    x='82'
                    >                    
                    ?
                </text>
            </React.Fragment>
        );
    }
}

export default BlankBoxWithQueston;