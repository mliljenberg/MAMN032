/**
 * Created by mliljenberg on 2017-03-24.
 */
import delay from './delay';
import * as playerAction from '../actions/playerAction';
import * as myselfAction from '../actions/myselfAction';


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

const words =[
  {
    word: "Snopp",
    def: "Något Martin saknar"
  },
  {
    word: "Vagina",
    def: "Något Martin har"
  },
  {
    word: "Stor Snopp",
    def: "Något Joel har"
  }
];

const answers = [];

let myself={};


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

  static JoinRoom() {

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

  static ServerUppdate() {
    let player = Object.assign({}, player);
    //socket stuff
    let exempel = {};
    if (exempel.type === 'player'){
      playerAction.updatePlayersSuccess(player);
    }

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


  static AddMyself(m) {
    m = Object.assign({}, m);
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        myself=m;
        resolve(m);
      }, delay);
    });
  }
}

export default Api;
