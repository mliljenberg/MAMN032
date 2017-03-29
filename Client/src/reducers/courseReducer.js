import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function courseReducer(state = initialState.courses,action) {
switch(action.type){
  case types.LOAD_COURSES_SUCCSESS:
   return action.courses;
  default: return state;
}
}
