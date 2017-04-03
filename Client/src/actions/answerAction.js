
import * as types from './ActionTypes';
import api from '../api/mockApi';


export function addAnswerSuccess(answer) {
  return { type: types.ADD_ANSWER_SUCCESS, answer};

}

export function updateAnswersSuccess(answer) {
  return {type: types.UPDATE_ANSWERS_SUCCESS, answer};
}

export function loadAnswersSuccess(answer) {
  return {type: types.UPDATE_ANSWERS_SUCCESS, answer};
}


export function loadAnswers() {
  return function (dispatch) {
    return api.GetAnswers().then(answers => {
      dispatch(loadAnswersSuccess(answers));
    }).catch((error) => {

      throw error;
    });
  };
}

export function addAnswer(answer) {
  return function(dispatch) {
    return api.SaveAnswer(answer).then(answer => {
      answer.id ? dispatch(updateAnswersSuccess(answer)) : dispatch(addAnswerSuccess(answer));
    });
  };


}
