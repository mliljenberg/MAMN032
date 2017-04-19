import * as types from './ActionTypes';
import api from '../api/api';


export function createRoomSuccsess(room) {
  return {type: types.CREATE_ROOM_SUCCESS, room};

}
export function joinRoomSuccsess(room) {
  return {type: types.JOIN_ROOM_SUCCESS, room};

}


export function createRoom() {
  return function (dispatch) {
    return api.CreateRoom().then(room => {
      dispatch(createRoomSuccsess(room));
    });
  };
}


export function joinRoom(room) {
  return function (dispatch) {
    return api.JoinRoom(room).then(room => {
      dispatch(joinRoomSuccsess(room));
    });
  };

}

