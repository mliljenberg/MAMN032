import * as types from './ActionTypes';
import * as playerApi from '../api/playerApi';
import * as hostApi from '../api/hostApi';


export function updateWordSuccess(word) {
  return { type: types.UPDATE_WORD_SUCCESS, word};

}
export function updateWordListSuccess(wordList) {
  return { type: types.UPDATE_WORD_LIST_SUCCESS, wordList};

}

export function updateWord(word,store) {
    store.dispatch(updateWordSuccess(word));

}

  export function updateWordList(wordList,store) {
  store.dispatch(updateWordListSuccess(wordList));
  }

export function newWord(wordList,username) {
  return function (dispatch) {
    let wordList1 = wordList.slice();
    console.log(wordList1);

    let word = Object.assign({},wordList1[0]);
    wordList1.shift();
    dispatch(updateWordListSuccess(wordList1));
    dispatch(updateWordSuccess(word));
    hostApi.DistributeWord(word.word, word.def, username);
  };
}




