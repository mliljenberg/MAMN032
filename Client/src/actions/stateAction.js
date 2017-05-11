import * as hostApi from '../api/hostApi';
import * as types from './ActionTypes';



export function changeState(url) {
  hostApi.ChangeState(url.url);
}


