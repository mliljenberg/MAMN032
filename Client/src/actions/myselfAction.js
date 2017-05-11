import * as types from './ActionTypes';
//import api from '../api/mockApi';


export function addMyselfSuccess(myself) {
  return {
    type: types.ADD_MYSELF_SUCCESS,
    myself
  };

}

export function addMyself(myself) {
  return function (dispatch) {
    return dispatch(addMyselfSuccess(myself));
  };
}
