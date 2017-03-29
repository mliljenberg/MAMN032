
import * as types from './ActionTypes';
import courseApi from '../api/mockApi';


export function loadMessagesSuccsess(messages) {
  return { type: types.LOAD_MESSAGES_SUCCSESS, messages};

}
export function addMessageSuccsess(message) {
  return { type: types.ADD_MESSAGE_SUCCESS, message};

}


export function loadMessages() {
  return function (dispatch) {
    return courseApi.GetMessages().then(messages => {
      dispatch(loadMessagesSuccsess(messages));
    }).catch((error) => {

      throw error;
    });
  };
}

export function addMessage() {
  return function(dispatch) {
    return (message => {
      dispatch(addMessageSuccsess(message));
    }).catch((error) => {

      throw error;
    });
  };


}
