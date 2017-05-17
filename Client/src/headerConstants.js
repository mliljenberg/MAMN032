/**
 * Constants used for host/client <-> server communication
 * **/

export const CREATE_ROOM_REQ = 'CREATE_ROOM_REQ';
export const CREATE_ROOM_ANS = 'CREATE_ROOM_ANS';


export const GET_PLAYERS_REQ = 'GET_PLAYERS_REQ';
export const GET_PLAYERS_ANS = 'GET_PLAYERS_ANS';

export const JOIN_ROOM_REQ = 'JOIN_ROOM_REQ';
export const JOIN_ROOM_ANS = 'JOIN_ROOM_ANS';
export const NEW_PLAYER_JOINED = 'NEW_PLAYER_JOINED';

export const SUBMIT_ANSWER_REQ = 'SEND_ANSWER_REQ';
export const SUBMIT_ANSWER_ERR = 'SEND_ANSWER_ERR';

export const SUBMIT_VOTE_REQ = 'SUBMIT_VOTE_REQ';
export const SUBMIT_VOTE_ERR = 'SUBMIT_VOTE_ERR';

export const CHANGE_STATE = 'CHANGE_STATE';

export const DIST_WORD = 'DIST_WORD';
export const DIST_ANS = 'DIST_ANS';
export const DIST_WORD_ERR = 'DIST_WORD_ERR';

export const STATE_WAIT_4_PLAYERS = 'STATE_WAIT_4_PLAYERS';
export const STATE_SUBMIT_ANSWER = 'STATE_SUBMIT_ANSWER';
export const STATE_VOTE = 'STATE_VOTE';
export const STATE_SHOW_POINTS = 'STATE_SHOW_POINTS';
export const STATE_FINAL_SCORE = 'STATE_FINAL_SCORE';
