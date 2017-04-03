import * as types from './ActionTypes';
import api from '../api/mockApi';


export function createRoomSuccsess(room) {
  return {type: types.CREATE_ROOM_SUCCESS, room};

}
export function joinRoomSuccsess(room) {
  return {type: types.JOIN_ROOM_SUCCESS, room};

}


export function createRoom(room) {
  return function (dispatch) {
    return api.CreateRoom(room).then(room => {
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

