
import * as types from './ActionTypes';
import api from '../api/mockApi';


export function updateWordsSuccess(words) {
  return { type: types.UPDATE_WORDS_SUCCESS, words};

}

export function updateWords(words) {
  return function(dispatch) {
    dispatch(updateWordsSuccess(words));
  };


}
