import * as types from './ActionTypes';
import * as playerApi from '../api/playerApi';
import * as hostApi from '../api/hostApi';

export function loadPlayersSuccess(players) {
  return { type: types.LOAD_PLAYERS_SUCCESS, players};

}
export function addPlayerSuccess(player) {
  return { type: types.ADD_PLAYER_SUCCESS, player};

}
export function updatePlayersSuccess(player) {
  return {type: types.UPDATE_PLAYERS_SUCCESS, player};
}
export function updatePlayerVoteSuccess(vote) {
  return {type: types.UPDATE_VOTE_SUCCESS, vote};
}



export function loadPlayers(store) {
  return function (dispatch) {
    /**
    return api.GetPlayers().then(players => {
      dispatch(loadPlayersSuccess(players));
    }).catch((error) => {
      throw error;
    });
     **/
  };
}
/**

export function addPlayer(player) {
  return function(dispatch) {
    return api.SavePlayer(player).then(player => {
      player.id ? dispatch(updatePlayersSuccess(player)) : dispatch(addPlayerSuccess(player));
    });
  };
}
 */
export function addPlayer(player,store) {
    store.dispatch(addPlayerSuccess(player));
}

/**
export function updatePlayer(player) {
  return function(dispatch) {
    dispatch(updatePlayersSuccess(player));
  };
}
 */

export function updatePlayerVote(vote,store) {
 let players =  store.getState().players;
 let list =[...players.filter((player) => player.username === vote.author)];
 let temp = Object.assign({},list[0]);
  temp.points += 1;
  store.dispatch(updatePlayersSuccess(Object.assign({},temp)));
}

export function submitVote(author, word) {
  return function(dispatch) {
    playerApi.SubmitVote(author, word);
  }
}
