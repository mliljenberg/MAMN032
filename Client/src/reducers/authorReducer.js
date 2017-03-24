import * as types from '../actions/ActionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors,action) {
  switch(action.type){
    case types.LOAD_AUTHORS_SUCCSESS:
      return action.authors;
    default: return state;
  }
}
