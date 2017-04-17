/**
 * Constants used for host/client <-> server communication
 * **/

export const CREATE_ROOM_REQ = 'CREATE_ROOM_REQ';
export const CREATE_ROOM_ANS = 'CREATE_ROOM_ANS';


export const GET_PLAYERS_REQ = 'GET_PLAYERS_REQ';
export const GET_PLAYERS_ANS = 'GET_PLAYERS_ANS';

export const JOIN_ROOM_REQ = 'JOIN_ROOM_REQ';
export const JOIN_ROOM_ANS = 'JOIN_ROOM_ANS';

export const SUBMIT_ANSWER_REQ = 'SEND_ANSWER_REQ';
export const SUBMIT_ANSWER_ANS = 'SEND_ANSWER_ANS';

export const CHANGE_STATE_REQ = 'CHANGE_STATE_REQ';
export const CHANGE_STATE_ANS = 'CHANGE_STATE_ANS';

export const STATE_WAIT_4_PLAYERS = 'STATE_WAIT_4_PLAYERS';
export const STATE_SUBMIT_ANSWER = 'STATE_SUBMIT_ANSWER';
export const STATE_VOTE = 'STATE_VOTE';
export const STATE_SHOW_POINTS = 'STATE_SHOW_POINTS';
export const STATE_FINAL_SCORE = 'STATE_FINAL_SCORE';
