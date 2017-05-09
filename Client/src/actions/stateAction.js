import * as hostApi from '../api/hostApi';
import * as types from './ActionTypes';




export function loadPlayersSuccess(players) {
  return { type: types.LOAD_PLAYERS_SUCCESS, players};

}


export function changeState(url) {
  hostApi.ChangeState(url.url);
}


