
import * as types from './ActionTypes';
import * as playerApi from '../api/playerApi';
import * as hostApi from '../api/hostApi';


export function addAnswerSuccess(answer) {
  return { type: types.ADD_ANSWER_SUCCESS, answer};

}

export function updateAnswersSuccess(answer) {
  return {type: types.UPDATE_ANSWERS_SUCCESS, answer};
}

export function loadAnswersSuccess(answer) {
  return {type: types.UPDATE_ANSWERS_SUCCESS, answer};
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

export function submitAnswer(ans) {
  return function (dispatch) {
    return playerApi.SubmitAnswer(ans).then(ans => {
      console.log(ans);
    }).catch((error) => {

      throw error;
    });
  };
}
