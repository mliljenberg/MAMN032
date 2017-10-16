import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import * as header from '../src/headerConstants';
import * as words from './words';

/* eslint-disable no-console */
const port = 80;
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
let legalChars = "abcdefghijklmnopqrstuvwxyz0123456789";

io.sockets.on('connection', function (socket) {
  console.log("New connection");

  /**
   * @desc: Creating a new room with a unique key.
   * @param:
   * @return: key
   * **/
  socket.on(header.CREATE_ROOM_REQ, function () {
    try {
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
        console.log("Nbr of rooms: " + hostRoom.size + "/" + roomHost.size);
        socket.emit(header.CREATE_ROOM_ANS, key, words);
      }
    } catch (err) {
      console.log(err.message);
    }
  });


  /**
   * @desc: Method for a player to join a room if it exists. If not, false is sent back to the requesting player.
   * @param: room key
   * @return: -/false.
   * **/
  socket.on(header.JOIN_ROOM_REQ, function (key, username) {
    try {
      if (roomHost.has(key)) {
        pending.set(key + username, socket);
        roomHost.get(key).emit(header.JOIN_ROOM_REQ, username);
      } else {
        socket.emit(header.JOIN_ROOM_ANS, false);
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  /**
   * @desc: The response from the host if specific player was allowed/denied to join. Forwarded to the player. Broadcast new player joined.
   * @param:
   * @return: true/false.
   * **/
  socket.on(header.JOIN_ROOM_ANS, function (ans, username) {
    try {
      if (hostRoom.has(socket)) {
        let key = hostRoom.get(socket);
        if (ans == true) {
          pending.get(key + username).join(key);
        }
        pending.get(key + username).emit(header.JOIN_ROOM_ANS, ans);
        pending.delete(key + username);
      }

    } catch (err) {
      console.log(err.message);
    }

  });


  /**
   * @desc: Forward word from host to players.
   * @param: wrd JSON (word, desc, username)
   * @return:
   * **/
  socket.on(header.DIST_WORD, function (wrd) {
    try {
      if (hostRoom.has(socket)) {
        socket.to(hostRoom.get(socket)).emit(header.DIST_WORD, wrd);
      }
    } catch (err) {
      socket.emit(header.DIST_WORD_ERR, wrd);
      console.log(err.message)
    }
  });

  /**
   * @desc: Forward word from host to players.
   * @param: wrd JSON (word, desc, username)
   * @return:
   * **/
  socket.on(header.DIST_ANS, function (ansList) {
    try {
      if (hostRoom.has(socket)) {
        socket.to(hostRoom.get(socket)).emit(header.DIST_ANS, ansList);
      }
    } catch (err) {

    }
  });


  /**
   * @desc: Send answer to host.
   * @param: key, answer (JSON)
   * @return:
   * **/
  socket.on(header.SUBMIT_ANSWER_REQ, function (key, ans) {
    try {
      if (roomHost.has(key)) {
        roomHost.get(key).emit(header.SUBMIT_ANSWER_REQ, ans);
      } else {
        socket.emit(header.SUBMIT_ANSWER_ERR, ans);
      }
    } catch (err) {
      console.log(err.message);
    }
  });


  /**
   * @desc: Broadcast a vote to room.
   * @param: key, vt.
   * @return: false (if key not valid)
   * **/
  socket.on(header.SUBMIT_VOTE_REQ, function (key, vt) {
    try {
      if (roomHost.has(key)) {
        roomHost.get(key).emit(header.SUBMIT_VOTE_REQ, vt);
      } else {
        socket.emit(header.SUBMIT_VOTE_ERR, vt);
      }
    } catch (err) {
      console.log(err.message);
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
  socket.on('disconnect', function () {
    try {
      if (hostRoom.has(socket)) {
        roomHost.delete(hostRoom.get(socket));
        hostRoom.delete(socket);
      }
      console.log("Nbr of rooms: " + hostRoom.size + "/" + roomHost.size);
    } catch (err) {
      console.log(err.message);
    }
  });
});


