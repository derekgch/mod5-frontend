

var express = require('express');
var socket = require('socket.io');


var app = express();



server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});



let players ={};

let lastestClientTimeStamp = (new Date()).getTime();
let lastestClient = null;
let equation = [];
let currentOp ="";
let gameStart = false;
io = socket(server);

io.on('connection', (client) => {
    if(lastestClientTimeStamp < client.handshake.issued ){
        lastestClientTimeStamp = client.handshake.issued
        lastestClient = client.id
    }

    console.log(client.handshake.issued);

    const emitPlayerSelf = function (){
        client.emit("PLAYER_SELF",players[client.id] )
    }

    const emitGameOver = function(playerId){
        players[client.id].hp =100;
        players[client.id].bullet =null;
        io.emit("GAME_OVER", {loser:playerId})
    }
        
    players[client.id] = {      
        x: 100,
        hp: 100,
        name:"",
        bullet: null,
        ready: false,
        playerId: client.id };

    // client.emit('NEW_PLAYER', players[client.id])
    emitPlayerSelf();

    io.emit("ALL_PLAYERS", players)

    client.on("USER_READY", id=>{
        console.log(id);
        
        let allUserReady = true;
        
        players[id].ready= true;
        Object.keys(players).forEach( (id)  => {
            if (players[id].ready === false) {
                allUserReady = false;
            }
        })

        if(allUserReady){
            gameStart = true;

        }
        io.emit("START_GAME", gameStart)
    })

    client.on("GET_QUESTIONS", data => {
        if(client.id === lastestClient){
            equation = data;
            currentOp = data[1];
            io.emit("NEW_QUESTIONS", equation);
        }
        console.log(data, equation);
        console.log(lastestClient, client.id);
        
    })

    client.on("UPDATE_NAME",data=>{
        players[client.id].name = data.name
    })

    client.on("MOVED", function (data) {
        // console.log(data)
        players[client.id].x = data.x;
        client.broadcast.emit("PLAYER_MOVED", players[client.id] ) //client.broadcast exlucing self
    })

    client.on("FIRED", function(data){
        // console.log(now)
        players[client.id].bullet = data;
        
        client.broadcast.emit("PLAYER_FIRED", {playerid:client.id , bullet: data});
    })

    client.on('BULLET_HIT', data =>{
        if(data.op === currentOp){
            players[data.otherPlayer].hp -= 20;
        }
        // console.log(data.op, currentOp);
        if(players[data.otherPlayer].hp < 1){
            emitGameOver(data.otherPlayer)
        }
        io.emit("PLAYER_HIT", players ) //client.broadcast exlucing self
        // emitPlayerSelf();

    })






    client.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[client.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', client.id);
    });


});