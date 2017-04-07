import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import players from './players';
import * as header from '../src/headerConstants';
import socket from 'socket.io';
import words from './words';

const users = [];
const connections = [];
const playersList = players;

/* eslint-disable no-console */
const rooms = new Map();
const port = 3000;
const app = express();
const compiler = webpack(config);
const player = {id:"", points:0};
const word = {word:"", def:""};
const answer = {player:{},word:{}, def:""};
const clientState = () => {

  return {room:"", words:[],players:[],url:"",answers:[] };
};

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
server.listen(3000);
console.log('server running...');
console.log(playersList[0].player +" is in room "+ playersList[0].room);

//console.log(words[0].def);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


/*
app.listen(port, function(err) {

  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});*/

io.sockets.on('connection', function (socket) {
  console.log("A player connected");

  socket.on(header.JOIN_ROOM, function (data) {
    console.log("Trying to join room: "+data);
    socket.join(data);
    let temp = clientState();
    temp.room = data;
    rooms.set(data, Object.assign({}, temp));

  });
  socket.on(header.GET_PLAYERS, function (data) {
    io.to(data).emit('new message',["1",'2','3']);
    setTimeout(() => {
      io.to(data).emit('new message',["3",'2','1']);
      console.log("sent seconda data message");
    }, 10);
    setTimeout(() => {
      io.to(data).emit(header.GET_PLAYERS,["3",'3','3']);
      console.log("sent third data message");
    }, 3000);
  });

  console.log('new connection');
  socket.on('disconnection', function (data) {
    console.log('disconnection');

  });

  socket.on('send message', function (data) {
    console.log("Trying to send data to only room: "+ data);

    io.to(data).emit('new message');
  });

});


