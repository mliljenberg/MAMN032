
import * as types from './ActionTypes';
import api from '../api/mockApi';


export function updateWordsSuccess(words) {
  return { type: types.UPDATE_WORD_SUCCESS, words};

}

export function updateWords(words) {
  return function(dispatch) {
    dispatch(updateWordsSuccess(words));
  };


}
