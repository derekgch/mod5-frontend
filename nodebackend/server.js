var express = require('express');
var socket = require('socket.io');

var app = express();


server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

let players ={};

io = socket(server);

io.on('connection', (client) => {
    console.log(client.id);


    players[client.id] = {
        x: 100,
        hp: 100,
        name:"",
        bullet:null,
        playerId: client.id,
    };

    client.emit('NEW_PLAYER', players[client.id])

    io.emit("ALL_PLAYERS", players)

    client.on("MOVED", function (data) {
        // console.log(data)
        players[client.id].x = data.x;
        io.emit("PLAYER_MOVED", players[client.id] ) //client.broadcast exlucing self
    })

    client.on("FIRED", function(data){
        // console.log(now)
        players[client.id].bullet = data;
        
        io.emit("PLAYER_FIRED", {playerid:client.id , bullet: data});
    })


    client.on('SEND_MESSAGE', function(data="server side testing"){
        client.emit('RECEIVE_MESSAGE', data+"sss");
    })



    client.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[client.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', client.id);
    });


});