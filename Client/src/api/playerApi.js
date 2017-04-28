/**
 *API which contains methods for HOST and CLIENT to communicate with the server.
 * **/

import io from 'socket.io-client';
import * as header from '../headerConstants';
import * as playerAction from '../actions/playerAction';
import {browserHistory}  from 'react-router';

let key = null;
let state = null;
let usrn = '';

let players = [];
const maxNbrPlayers = 4;

let socket = io.connect();


/**
 * @desc: Method to join a room
 * @param: room key, username
 * @return:
 * **/
export function JoinRoom(roomKey, username) {
  socket.emit(header.JOIN_ROOM_REQ, roomKey, username);
  return new Promise((resolve, reject) => {
    socket.on(header.JOIN_ROOM_ANS, function (ans) {
      if (ans == true) {
        usrn = username;
        key = roomKey;

        resolve(Object.assign({}, ans));
      } else {
        reject(Object.assign({}, ans));
        key = null;
      }
    });
  });
}


/**
 * @desc: Submit answer by username for word to room.
 * @param: username, word, answer.
 * @return:
 * **/
export function SubmitAnswer(username, word, answer) {
  if (key) {

    let ans = {
      "username": username,
      "word": word,
      "answer": answer
    };

    socket.emit(header.SUBMIT_ANSWER_REQ, key, ans);
  }
}

/****/
export function SubmitVote(author, vote){
  let vt = {
    "username":usrn,
    "author":author,
    "vote":vote
  };
  socket.emit(header.SUBMIT_ANSWER_REQ);
}

/**
 * @desc: Contains all answers from the server.
 * **/
export function ServerUpdate(store) {

  /**
   * @desc: Host changed the current state.
   * @param: state
   * @return:
   * **/
  socket.on(header.CHANGE_STATE, function (url) {
    browserHistory.push(url);
  });


  /**
   * @desc: Handle the shutdown of the socket.
   * @param:
   * @return:
   * **/
  socket.on('disconnection', function() {
    key = '';
  });

}
