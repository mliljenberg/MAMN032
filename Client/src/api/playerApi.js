import io from 'socket.io-client';
import * as header from '../headerConstants';
import * as playerAction from '../actions/playerAction';
import * as wordAction from '../actions/wordAction';
import * as answserAction from '../actions/answerAction';
import {browserHistory}  from 'react-router';

let connectedToRoom = false;
let key = '';
let usrn = '';

let socket = io.connect();


/**
 * @desc: Method to join a room
 * @param: room key, username
 * @return: Promise(true/false)
 * **/
export function JoinRoom(roomKey, username) {
  socket.emit(header.JOIN_ROOM_REQ, roomKey, username);
  return new Promise((resolve, reject) => {
    socket.on(header.JOIN_ROOM_ANS, function (ans) {
      if (ans == true) {
        usrn = username;
        key = roomKey;
        connectedToRoom = true;
        resolve(Object.assign({}, ans));
      } else {
        key = '';
        reject(Object.assign({}, ans));
      }
    });
  });
}


/**
 * @desc: Submit answer by username for word to room.
 * @param: username, word, answer.
 * @return:
 * **/
export function SubmitAnswer(word, answer) {
  if (connectedToRoom) {
    let ans = {
      "username": usrn,
      "word": word,
      "answer": answer,
      "voted":[]
    };
    socket.emit(header.SUBMIT_ANSWER_REQ, key, ans);
  }
}

/**
 * @desc: Submit a vote for a specific answer (not our own).
 * @param: author, word.
 * @return:
 * **/
export function SubmitVote(author, word) {
  if (connectedToRoom) {
    let vt = {
      "username": usrn,
      "author": author,
      "word": word
    };
    socket.emit(header.SUBMIT_VOTE_REQ, key, vt);
  }
}


/**
 * @desc:
 * **/
export function ServerUpdate(store) {

  /**
   * @desc: Host changed the current state.
   * @param: url
   * @return:
   * **/
  socket.on(header.CHANGE_STATE, function (url) {
    browserHistory.push(url);
  });

  /**
   * @desc: Word received from host. Username included of the player who must use the correct answer.
   * @param: wrd JSON(word, desc, username)
   * @return:
   * **/
  socket.on(header.DIST_WORD, function (wrd) {
    //TODO
    wordAction.updateWord(wrd,store);
  });
  socket.on(header.DIST_ANS, function (ansList) {
    //TODO
    console.log(ansList);
    answserAction.updateAnswerList(ansList,store);
  });

  /**
   *@desc: An error has occurred while submitting an answer.
   * @param: ans (which was unsuccessfully delivered).
   * @return:
   * **/
  socket.on(header.SUBMIT_ANSWER_ERR, function (ans) {
    //TODO
  });

  /**
   *@desc: An error has occurred while submitting a vote.
   * @param: vt (which was unsuccessfully delivered).
   * @return:
   * **/
  socket.on(header.SUBMIT_VOTE_ERR, function (vt) {
    //TODO
  });

  /**
   * @desc: Handle the shutdown of the socket.
   * @param:
   * @return:
   * **/
  socket.on('disconnect', function () {
    connectedToRoom = false;
    key = '';
  });

}
