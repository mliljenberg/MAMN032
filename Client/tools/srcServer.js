import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import * as header from '../src/headerConstants';

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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


/**
 * Server methods
 **/
let roomHost = new Map(); //Key: room key Value: hostSocket
let hostRoom = new Map(); //Key: hostSocket. Value: room key
let pending = new Map(); //Key: key+username. Value: socket
let legalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

io.sockets.on('connection', function (socket) {
  console.log("New connection");

  /**
   * @desc: Creating a new room with a unique key.
   * @param:
   * @return: key
   * **/
  socket.on(header.CREATE_ROOM_REQ, function () {
    if (!hostRoom.has(socket)) {
      let key;
      do {
        key = '';
        for (var i = 0; i < 5; i++) {
          key += legalChars.charAt(Math.floor(Math.random() * legalChars.length));
        }
      } while (roomHost.has(key));

      hostRoom.set(socket, key);
      roomHost.set(key, socket);

      socket.emit(header.CREATE_ROOM_ANS, key);
    }
  });


  /**
   * @desc: Method for a player to join a room if it exists.
   * @param: room key
   * @return: true/false.
   * **/
  socket.on(header.JOIN_ROOM_REQ, function (key, username) {
    if (roomHost.has(key)) {
      pending.set(key + username, socket);
      roomHost.get(key).emit(header.JOIN_ROOM_REQ, username);
    } else {
      socket.emit(header.JOIN_ROOM_ANS, false);
    }
  });


  /**
   * @desc: The response from the host if specific player was allowed/denied to join. Forwarded to the player. Broadcast new player joined.
   * @param:
   * @return: true/false.
   * **/
  socket.on(header.JOIN_ROOM_ANS, function (ans, username) {
    let key = hostRoom.get(socket);
    if (ans == true) {

      pending.get(key + username).join(key);
      socket.to(key).emit(header.NEW_PLAYER_JOINED, username);
    }
    pending.get(key + username).emit(header.JOIN_ROOM_ANS, ans);
    pending.delete(key + username);
  });


  /**
   * @desc: Broadcast answer to all sockets in room.
   * @param: room key, answer
   * @return: true/false.
   * **/
  socket.on(header.SUBMIT_ANSWER_REQ, function (key, ans) {
    try {
      socket.to(key).emit(header.SUBMIT_ANSWER_ANS, ans);
      socket.emit(header.SUBMIT_ANSWER_ANS, true);
    } catch (err) {
      console.log(err.message);
      socket.emit(header.SUBMIT_ANSWER_ANS, false);
    }
  });


  /**
   * @desc: Broadcast a vote to room.
   * @param: key, vt.
   * @return: true/false.
   * **/
  socket.on(header.SUBMIT_VOTE_REQ, function (key, vt) {
    try {
      socket.to(key).emit(header.SUBMIT_ANSWER_ANS, vt);
      socket.emit(header.SUBMIT_VOTE_ANS, true);
    } catch (err) {
      console.log(err.message);
      socket.emit(header.SUBMIT_VOTE_ANS, false);
    }
  });

  /**
   * @desc: Broadcast a new state to all players from host.
   * @param: key, state.
   * @return: true/false.
   * **/
  socket.on(header.CHANGE_STATE, function (state) {
    try {
      socket.to(hostRoom.get(socket)).emit(header.CHANGE_STATE, state);
    } catch (err) {
      console.log(err.message);
    }
  });


  /**
   * @desc: Handles the disconnection of a socket. If the socket is a host all clients will be kicked from the room.
   * @param:
   * @return:
   * **/
  socket.on('disconnection', function () {
    if (hostRoom.has(socket)) {
      roomHost.delete(hostRoom.get(socket));
      hostRoom.delete(socket);
      //TODO: Kick all clients from room
      console.log("Host dc");
    }
  });

});


