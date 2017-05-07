import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function wordReducer(state = initialState.word,action) {
  switch(action.type){

    case types.UPDATE_WORD_SUCCESS:
      return action.word;


    default: return state;
  }
}
