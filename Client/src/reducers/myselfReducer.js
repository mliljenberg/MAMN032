import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function myselfReducer(state = initialState.myself,action) {
  switch(action.type){
    case types.ADD_MYSELF_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.myself)
      ];


    default: return state;
  }
}
