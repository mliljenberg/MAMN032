import io from 'socket.io-client';
import * as header from '../headerConstants';
import * as playerAction from '../actions/playerAction';
import * as answerAction from '../actions/answerAction';

let state = null;

let nbrOfPlayers;
const maxNbrPlayers = 4;

let socket = io.connect();

/**
 * @desc: Create new room, sets state to wait_4_players.
 * @param:
 * @return
 * **/
export function CreateRoom() {
  socket.emit(header.CREATE_ROOM_REQ);
  return new Promise((resolve) => {
    socket.on(header.CREATE_ROOM_ANS, function (ans) {
      nbrOfPlayers = 0;
      state = header.STATE_WAIT_4_PLAYERS;
      resolve(Object.assign({}, {id: ans}));
    });
  });
}


/**
 * @desc: Method for the host to change state.
 * @param: state.
 * @return:
 * **/
export function ChangeState(url) {
  return new Promise((resolve) => {
    socket.emit(header.CHANGE_STATE, url);
    resolve(true);
  }
  );

}


export function ServerUpdate(store) {
  /**
   * @desc: Host allows/denies a player to join the game.
   * @param: username.
   * @return: true/false.
   *
   * **/
  socket.on(header.JOIN_ROOM_REQ, function (username) {
    if (nbrOfPlayers < maxNbrPlayers && state == header.STATE_WAIT_4_PLAYERS) {
      let plr = {
        "name": username,
        "points": 0
      };
      nbrOfPlayers++;
      console.log(plr);
      playerAction.addPlayer(plr,store);
      socket.emit(header.JOIN_ROOM_ANS, true, username);
    } else {
      socket.emit(header.JOIN_ROOM_ANS, false, username);
    }
  });

  /**
   * @desc: Host receives an answer from a player.
   * @param: ans (JSON: username, word, answer).
   * @return:
   * **/
  socket.on(header.SUBMIT_ANSWER_REQ, function (ans) {
    answerAction.addAnswer(ans,store);
  });

  /**
   * @desc: Host receives a vote from a player.
   * @param: vt (JSON: username, author, word).
   * @return:
   * **/
  socket.on(header.SUBMIT_VOTE_REQ, function (vt) {
    playerAction.updatePlayerVote(vt,store);
  });

  /**
   * @desc: Handle the shutdown of the socket.
   * @param:
   * @return:
   * **/
  socket.on('disconnection', function () {
  });
}
