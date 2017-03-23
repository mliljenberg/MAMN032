import * as types from '../actions/ActionTypes';


export default function courseReducer(state = [],action) {
switch(action.type){
  case types.LOAD_COURSES_SUCCSESS:
   return action.courses;
  default: return state;
}
}
