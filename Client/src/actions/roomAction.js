import * as types from './ActionTypes';
import * as playerApi from '../api/playerApi';
import * as hostApi from '../api/hostApi';


export function createRoomSuccsess(room) {
  return {type: types.CREATE_ROOM_SUCCESS, room};

}
export function joinRoomSuccsess(room) {
  return {type: types.JOIN_ROOM_SUCCESS, room};

}


export function createRoom() {
  return function (dispatch) {
    return hostApi.CreateRoom().then(room => {
      dispatch(createRoomSuccsess(room));
    });
  };
}


export function joinRoom(room,username) {
  return function (dispatch) {
    return playerApi.JoinRoom(room,username).then(ans => {

      if(ans){

        dispatch(joinRoomSuccsess(Object.assign({},{id:room})));
      }

    });
  };

}

