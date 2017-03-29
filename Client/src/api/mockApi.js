/**
 * Created by mliljenberg on 2017-03-24.
 */
import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const wordList = [
  {
    id:"1",
    word: 'hej',
    definition: 'halla'
  }
];
const messages = [
  {
    id:"0",
    value: 'Marcus'
  },
  {
    id:"1",
    value: 'Martin is a faggot'
  }

];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return Math.random(0,10000);
};

class Api {
  static ConnectToRoom() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //sätt in koden här men ta bort timeouten
      }, delay);
    });
  }

  static CreateRoom() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //sätt in koden här men ta bort timeouten
      }, delay);
    });
  }
  static GetMessages() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], messages));
      }, delay);
    });
  }
  static SaveMessage(message) {
    message = Object.assign({},message);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        message.id = generateId();
        messages.push(message);
        resolve(message);
      }, delay);
    });
  }
}

export default Api;
