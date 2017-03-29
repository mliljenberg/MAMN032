import {combineReducers} from 'redux';
import courses from "./courseReducer";
import initialState from './initialState';
import authors from './authorReducer';
import messages from './messageReducer';

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  messages: messages
});

export default rootReducer;
