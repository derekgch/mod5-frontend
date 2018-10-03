import React, { Component } from 'react';
import ChatContainer from './ChatContainer';
import ListContainer from './ListContainer';
import openSocket from 'socket.io-client';
import Adapter, { ip } from '../../../Adapter';


class Room extends Component {
    constructor(props){
        super(props);
        this.socket = openSocket(`http://${ip}:5000`);
        this.state={
            self:null,
            message:"",
            others:[]
        }

    }

    componentDidMount(){
        this.socket.emit("RESTART");
        this.socket.on("ALL_PLAYERS", data => this.getPlayers(data));
        console.log("mount")
    }

    getPlayers=(data)=>{
        console.log("getplayers")
        Object.keys(data).forEach( (id)  => {
            if (data[id].playerId === this.socket.id) {
                console.log("self", id);
                this.setState({self:data[id]})
            } else {
                console.log("others",id);
                this.setState({others:[...this.state.others, data[id]]})
            }
        })
    }



    render() {
        return (
            <div className="room-container">
                <ListContainer />

                <ChatContainer socket={this.socket}/>

                
            </div>
        );
    }
}

export default Room;