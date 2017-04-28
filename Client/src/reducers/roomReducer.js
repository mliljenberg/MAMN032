import * as types from '../actions/ActionTypes';
import initialState from './initialState';

export default function roomReducer(state = initialState.room ,action) {
  switch(action.type){

    case types.CREATE_ROOM_SUCCESS:
      return action.room;

    case types.JOIN_ROOM_SUCCESS:
      return Object.assign({}, action.room);


    default: return state;
  }
}
