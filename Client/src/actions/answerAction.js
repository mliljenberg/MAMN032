
import * as types from './ActionTypes';
import * as playerApi from '../api/playerApi';
import * as hostApi from '../api/hostApi';


export function addAnswerSuccess(answer) {
  return { type: types.ADD_ANSWER_SUCCESS, answer};

}

export function updateAnswersSuccess(answer) {
  return {type: types.UPDATE_ANSWERS_SUCCESS, answer};
}

export function loadAnswersSuccess(answers) {
  return {type: types.LOAD_ANSWERS_SUCCESS, answers};
}
export function clearAnswersSuccess() {
  return {type: types.CLEAR_ANSWER_SUCCESS};
}

/**
export function loadAnswers() {
  return function (dispatch) {
    return api.GetAnswers().then(answers => {
      dispatch(loadAnswersSuccess(answers));
    }).catch((error) => {

      throw error;
    });
  };
}
 */

export function addAnswer(answer, store) {
  store.dispatch(addAnswerSuccess(answer));
}

export function updateAnswerList(ansList, store) {
  store.dispatch(loadAnswersSuccess(ansList));
}

export function submitAnswer(word,answer) {
  return function (dispatch) {
    playerApi.SubmitAnswer(word, answer);
  }
}


  export function clearAnswers() {
    return function (dispatch) {
      dispatch(clearAnswersSuccess());
    }
}


