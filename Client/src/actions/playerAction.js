
import * as types from './ActionTypes';
import api from '../api/mockApi';


export function loadPlayersSuccess(players) {
  return { type: types.LOAD_PLAYERS_SUCCESS, players};

}
export function addPlayerSuccess(player) {
  return { type: types.ADD_PLAYER_SUCCESS, player};

}
export function updatePlayersSuccess(player) {
  return {type: types.UPDATE_PLAYERS_SUCCESS, player};
}


export function loadPlayers() {
  return function (dispatch) {
    return api.GetPlayers().then(players => {
      dispatch(loadPlayersSuccess(players));
    }).catch((error) => {
      throw error;
    });
  };
}

export function addPlayer(player) {
  return function(dispatch) {
    return api.SavePlayer(player).then(player => {
      player.id ? dispatch(updatePlayersSuccess(player)) : dispatch(addPlayerSuccess(player));
    });
  };
}
export function updatePlayer(player) {
  return function(dispatch) {
    dispatch(updatePlayersSuccess(player));
  };
}
