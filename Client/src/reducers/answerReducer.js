import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function answerReducer(state = initialState.answers,action) {
  switch(action.type){
    case types.ADD_ANSWER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.answer)
      ];


    case types.UPDATE_ANSWERS_SUCCESS:
      return [
        ...state.filter(answer => answer.id !== action.answer.id),
        Object.assign({}, action.answer)
      ];

    case types.LOAD_ANSWERS_SUCCESS:
      return action.answers;


    default: return state;
  }
}
