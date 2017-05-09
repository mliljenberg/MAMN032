
import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function messageReducer(state = initialState.messages,action) {
  switch(action.type){
    case types.LOAD_MESSAGES_SUCCESS:
      return action.messages;

    case types.ADD_MESSAGE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.message)
      ];


    case types.UPDATE_MESSAGE_SUCCESS:
      return [
        ...state.filter(message => message.id !== action.message.id),
        Object.assign({}, action.message)
      ];


    default: return state;
  }
}
