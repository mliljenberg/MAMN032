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
const players = [
  {
    id:"0",
    value: 'Marcus'
  },
  {
    id:"1",
    value: 'Ludde'
  }

];

const answers = [];


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
    message = Object.assign({}, message);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        message.id = generateId();
        messages.push(message);
        resolve(message);
      }, delay);
    });
  }

  static GetPlayers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], players));
      }, delay);
    });
  }

  static SavePlayer(player) {
    player = Object.assign({}, player);
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        players.push(player);
        resolve(player);
      }, delay);
    });
  }

  static GetAnswers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], answers));
      }, delay);
    });
  }

  static SaveAnswer(answer) {
    answer = Object.assign({}, answer);
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        answers.push(answer);
        resolve(answer);
      }, delay);
    });
  }


  static AddMyself(myself) {
    myself = Object.assign({}, myself);
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        myself.push(myself);
        resolve(myself);
      }, delay);
    });
  }
}


export default Api;
