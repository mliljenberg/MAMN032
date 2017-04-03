import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function wordReducer(state = initialState.words,action) {
  switch(action.type){

    case types.UPDATE_WORDS_SUCCESS:
      return action.words;


    default: return state;
  }
}
