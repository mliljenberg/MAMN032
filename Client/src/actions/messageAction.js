
import * as types from './ActionTypes';
import api from '../api/mockApi';


export function loadMessagesSuccess(messages) {
  return { type: types.LOAD_MESSAGES_SUCCESS, messages};

}
export function addMessageSuccess(message) {
  return { type: types.ADD_MESSAGE_SUCCESS, message};

}
export function updateMessageSuccess(message) {
  return {type: types.UPDATE_MESSAGE_SUCCESS, message};
}


export function loadMessages() {
  return function (dispatch) {
    return api.GetMessages().then(messages => {
      dispatch(loadMessagesSuccess(messages));
    }).catch((error) => {

      throw error;
    });
  };
}

export function addMessage(message) {
  return function(dispatch) {
    return api.SaveMessage(message).then(message => {
      message.id ? dispatch(updateMessageSuccess(message)) : dispatch(addMessageSuccess(message));
    });
  };


}
