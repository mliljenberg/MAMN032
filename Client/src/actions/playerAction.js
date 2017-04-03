
import * as types from './ActionTypes';
import api from '../api/mockApi';


export function loadPlayersSuccsess(players) {
  return { type: types.LOAD_PLAYERS_SUCCSESS, players};

}
export function addPlayerSuccsess(player) {
  return { type: types.ADD_PLAYER_SUCCESS, player};

}
export function updatePlayersSuccess(player) {
  return {type: types.UPDATE_PLAYERS_SUCCESS, player};
}


export function loadPlayers() {
  return function (dispatch) {
    return api.GetPlayers().then(players => {
      dispatch(loadPlayersSuccsess(players));
    }).catch((error) => {

      throw error;
    });
  };
}

export function addPlayer(player) {
  return function(dispatch) {
    return api.SavePlayer(player).then(player => {
      player.id ? dispatch(updatePlayersSuccess(player)) : dispatch(addPlayerSuccsess(player));
    });
  };


}
