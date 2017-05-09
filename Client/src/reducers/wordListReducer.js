import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function wordListReducer(state = initialState.wordList,action) {
  switch(action.type){

    case types.UPDATE_WORD_LIST_SUCCESS:
      return action.wordList;


    default: return state;
  }
}

