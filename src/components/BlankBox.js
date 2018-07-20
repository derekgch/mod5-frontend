import React, { Component } from 'react';

class BlankBox extends Component {
    
    render() {
        return (
            <React.Fragment>
                
                <rect  x={this.props.start} y="35" height="50" width="50" fill="none" stroke="#ff8a65" strokeWidth="4">
                   
                </rect>
            </React.Fragment>
        );
    }
}

export default BlankBox;