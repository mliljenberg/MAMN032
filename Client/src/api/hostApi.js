import io from 'socket.io-client';
import * as header from '../headerConstants';
import * as playerAction from '../actions/playerAction';
import * as answerAction from '../actions/answerAction';
import * as wordAction from '../actions/wordAction';

let state = null;

let nbrOfPlayers;
const maxNbrPlayers = 4;
let storen = null;
let socket = io.connect();

/**
 * @desc: Create new room, sets state to wait_4_players.
 * @param:
 * @return
 * **/


export function CreateRoom() {
  socket.emit(header.CREATE_ROOM_REQ);
  return new Promise((resolve) => {
    socket.on(header.CREATE_ROOM_ANS, function (ans, wordlist) {
      nbrOfPlayers = 0;
      state = header.STATE_WAIT_4_PLAYERS;
      wordAction.updateWordList(wordlist.default,storen);
      resolve(Object.assign({}, {id: ans}));
    });
  });
}

/**
 * @desc: Distribute the current word to all players. Username included of the user who must use the real desc.
 * @param: word, desc, username
 * @return:
 * **/
export function DistributeWord(word, def, username) {
  let wrd = {
    "word": word,
    "def": def,
    "username": username
  };
  return new Promise((resolve) => {
    socket.emit(header.DIST_WORD, wrd);
    resolve(true);
  });
}
/**
 * @desc: Distribute awnser list till alla.
 * @param: anwserList
 * @return:
 * **/
export function DistributeAns(ansList) {
    socket.emit(header.DIST_ANS, ansList);
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
  });
}

export function ServerUpdate(store) {
  /**
   * @desc: Host allows/denies a player to join the game.
   * @param: username.
   * @return: true/false.
   *
   * **/

 storen = store;
  socket.on(header.JOIN_ROOM_REQ, function (username) {
    if (nbrOfPlayers < maxNbrPlayers && state == header.STATE_WAIT_4_PLAYERS) {
      let plr = {
        "username": username,
        "points": 0
      };
      nbrOfPlayers++;
      playerAction.addPlayer(plr, store);
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
    answerAction.addAnswer(ans, store);
  });

  /**
   * @desc: Host receives a vote from a player.
   * @param: vt (JSON: username, author, word).
   * @return:
   * **/
  socket.on(header.SUBMIT_VOTE_REQ, function (vt) {
    playerAction.updatePlayerVote(vt, store);
  });

  /**
   * @desc: Handle the shutdown of the socket.
   * @param:
   * @return:
   * **/
  socket.on('disconnection', function () {
    //TODO
  });
}
