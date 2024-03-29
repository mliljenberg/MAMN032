import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function messageReducer(state = initialState.players,action) {
  switch(action.type){
    case types.LOAD_PLAYERS_SUCCESS:
      return action.players;

    case types.ADD_PLAYER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.player)
      ];

    case types.UPDATE_VOTE_SUCCESS:
      return [
        ...state.filter(player => player.username === action.player.username),
        Object.assign({}, action.player)
      ];


    case types.UPDATE_PLAYERS_SUCCESS:
      return [
        ...state.filter(player => player.username !== action.player.username),
        Object.assign({}, action.player)
      ];


    default: return state;
  }
}
