import React, { Component } from 'react';

class BlankBox extends Component {
    amine =(start,time="10s") => {
        return <animate attributeType="XML" attributeName="x" from={start} to={start+200} dur={time} repeatCount="indefinite"/>
    } 
    render() {
        return (
            <React.Fragment>
                
                <rect  x={this.props.start} y="35" height="50" width="50" fill="none" stroke="#ff8a65" strokeWidth="4">
                    {this.amine(this.props.start)}
                </rect>
            </React.Fragment>
        );
    }
}

export default BlankBox;