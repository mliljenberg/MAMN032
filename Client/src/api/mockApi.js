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

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return 1;
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


}

export default Api;
