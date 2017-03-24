import {combineReducers} from 'redux';
import courses from "./courseReducer";
import initialState from './initialState';
import authors from './authorReducer';

const rootReducer = combineReducers({
  courses: courses,
  authors: authors
});

export default rootReducer;
