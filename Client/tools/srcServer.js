import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import players from './players';
import * as header from '../src/headerConstants';
import socket from 'socket.io';
import words from './words';

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


server.listen(port);
console.log('server running...');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


/**
 * Server methods
 **/

let rooms = [];
let hostrooms = new Map(); //Key: hostSocket. Value: room key
let legalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

io.sockets.on('connection', function (socket) {
  console.log("New connection");

  /**
   * Create new room.
   * @Params: null
   * @Return: room key
   * **/
  socket.on(header.CREATE_ROOM_REQ, function () {
    console.log("Creating new room");
    let key;
    do{
      for(var i = 0; i < 5; i++){
        key += legalChars.charAt(Math.floor(Math.random() * legalChars.length));
      }
    }while(rooms.includes(key));

    hostrooms.set(socket, key);
    rooms.push(key);
    socket.emit(header.CREATE_ROOM_ANS, key);
  });


/**
 * Join existing room.
 * @Params: username, room key
 * @Return: success/failure
 * **/
  socket.on(header.JOIN_ROOM_REQ, function (data) {
    try{
      if(rooms.includes(data)){
        socket.join(data); //join room if exists
        socket.emit(header.JOIN_ROOM_ANS, true);
      } else {
        socket.emit(header.JOIN_ROOM_ANS, false);
      }
    } catch (err){
      socket.emit(header.JOIN_ROOM_ANS, false);
      console.log(err.message);
    }
  });


  /**
   * Client/Host disconnect
   * @Params: null
   * @return: null
   * **/
  socket.on('disconnection', function () {
    console.log("Disconnection");

    if(hostrooms.has(socket)){ //Frigör rumsnyckel ifall det är en host som dc.
      rooms.splice(hostrooms.get(socket) ,1);
      hostrooms.delete(socket);
      console.log("Host dc");
    }

    //Kick all clients from room
  });

});


