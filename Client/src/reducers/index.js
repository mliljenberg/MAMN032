import {combineReducers} from 'redux';
import courses from "./courseReducer";
import initialState from './initialState';
import authors from './authorReducer';
import messages from './messageReducer';
import players from './playerReducer';
import words from './wordReducer';
import room from './roomReducer';

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  messages: messages,
  players: players,
  words: words,
  room: room

});

export default rootReducer;
