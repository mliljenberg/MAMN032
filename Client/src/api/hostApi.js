import io from 'socket.io-client';
import * as header from '../headerConstants';
import * as playerAction from '../actions/playerAction';

let key = null;
let state = null;
let usrn = '';

let players = [];
const maxNbrPlayers = 4;

let socket = io.connect();

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
 * @desc: Method for the host to change state.
 * @param: key, state.
 * @return:
 * **/
export function ChangeState(key, state) {
  socket.emit(header.CHANGE_STATE_REQ, key, state);
  return new Promise((resolve, reject) => {
    socket.on(header.CHANGE_STATE_ANS, function (ans) {
      if(ans == true){
        resolve(Object.assign({}, ans));
      } else {
        reject(Object.assign({}, ans));
      }
    });
  });
}




export function ServerUpdate() {

  /**
   * @desc: Host allows/denies a player to join the game.
   * @param: username.
   * @return: true/false.
   * **/
  socket.on(header.JOIN_ROOM_REQ, function (username) {
    if(!isHost){
      return;
    }
    if (players.length < maxNbrPlayers && state == header.STATE_WAIT_4_PLAYERS) {
      playerAction.updatePlayer(username);
      socket.emit(header.JOIN_ROOM_ANS, true, key, username);
    } else {
      socket.emit(header.JOIN_ROOM_ANS, false, key, username);
    }
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
