import React, { Component } from 'react';
import ChatContainer from './ChatContainer';
import ListContainer from './ListContainer';

class Room extends Component {
    render() {
        return (
            <div className="room-container">
                <ListContainer />

                <ChatContainer />

                
            </div>
        );
    }
}

export default Room;