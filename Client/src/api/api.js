/**
 *API which contains methods for HOST and CLIENT to communicate with the server.
 * **/

import io from 'socket.io-client';
import * as header from '../headerConstants';
import * as playerAction from '../actions/playerAction';

let key = null;
let state = null;
let isHost = false;
let usrn = '';

let players = [];
const maxNbrPlayers = 4;

let socket = io.connect();


/********************************** SETUP ************************************/
/**
 * @desc: Create new room, sets state to wait_4_players.
 * @param:
 *
 * **/
export function CreateRoom() {
  socket.emit(header.CREATE_ROOM_REQ);
  return new Promise((resolve) => {
    socket.on(header.CREATE_ROOM_ANS, function (ans) {
      isHost = true;
      state = header.STATE_WAIT_4_PLAYERS;
      resolve(Object.assign({}, {id:ans}));
    });
  });
}

/**
 * @desc: Method to join a room
 * @param: room key, username
 * @return:
 * **/
export function JoinRoom(roomKey, username) {
  if (isHost) {
    return;
  }
  key = roomKey;
  socket.emit(header.JOIN_ROOM_REQ, key, username);
  return new Promise((resolve, reject) => {
    socket.on(header.JOIN_ROOM_ANS, function (ans) {
      if (ans == true) {
        usrn = username;
        resolve(Object.assign({}, ans));
      } else {
        reject(Object.assign({}, ans));
        key = null;
      }
    });
  });
}

/******************************** GAME_STARTED **********************************/

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

export function SubmitVote(author, vote){
  let vote = {
    "username":usrn,
    "author":author,
    "vote":vote
  };
  socket.emit(header.);
}

/**
 * @desc: Method for the host to change state.
 * @param: key, state.
 * @return:
 * **/
export function ChangeState(key, state) {
  socket.emit(header.CHANGE_STATE_REQ, key, state);
}

/**
 * @desc: Contains all answers from the server.
 * **/
export function ServerUpdate() {

  /**
   * @desc: Host allows/denies a player to join the game.
   * @param: username.
   * @return: true/false.
   * **/
  socket.on(header.JOIN_ROOM_REQ, function (socket, username) {
    if (players.length < maxNbrPlayers && state == header.STATE_WAIT_4_PLAYERS) {
      playerAction.updatePlayer(username);
      socket.emit(header.JOIN_ROOM_ANS, socket, true, key, username);
    } else {
      socket.emit(header.JOIN_ROOM_ANS, socket, false, null, null);
    }
  });

  /**
   * @desc: Answer from server if joining a room succeeded/failed.
   * @param: true/false.
   * @return:
   * **/
  socket.on(header.JOIN_ROOM_ANS, function (ans) {
    if (ans == true) {
      //gör ngt
    } else {
      //gör ngt
    }
  });


  /**
   * @desc: Broadcast msg from server, new player has joined the room.
   * @param: username
   * @return:
   * **/
  socket.on(header.NEW_PLAYER_JOINED, function (username) {
    //gör ngt
  });


  /**
   * @desc: Response from server on success/failure to submit answer OR answer from another player.
   * @param:
   * @return: true/false/JSON answer
   * **/
  socket.on(header.SUBMIT_ANSWER_ANS, function (ans) {
    if (ans == true) {
      //gör ngt
    } else if (ans == false) {
      //skicka igen?
    } else {
      //display
    }
  });


  /**
   * @desc: Handle the shutdown of the socket.
   * @param:
   * @return:
   * **/
  socket.on('disconnection', function() {
    isHost = false;
    key = '';
  });

}
