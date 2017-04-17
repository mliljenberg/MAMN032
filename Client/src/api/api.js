/**
 *API which contains methods for HOST and CLIENT to communicate with the server.
 * **/

import io from 'socket.io-client';
import * as header from '../headerConstants';

let key = null;
let state = null;
const maxNbrPlayers = 4;
let words = []; //Koppla till redux!
let players = []; // Koppla till redux!

let socket = null;
let instance = null;

class NetworkHandler{

  /**
   * @desc: Creation of a NetworkHandler, this is a singleton class.
   * @param:
   * @return:
   * **/
  constructor(){
    if(!instance){
      socket = io.connect();
      instance = this;
    }
    return instance;
  }

  /**
   * @desc: Method to create room
   * @param:
   * @return:
   * **/
  CreateRoom(){
    socket.emit(header.CREATE_ROOM_REQ);
  }

  /**
   * @desc: Method to join a room
   * @param: room key, username
   * @return:
   * **/
  JoinRoom(roomKey, username){
    key = roomKey;
    socket.emit(header.JOIN_ROOM_REQ, key, username);
  }


  /**
   * @desc: Submit answer by username for word to room.
   * @param: username, word, answer.
   * @return:
   * **/
  SubmitAnswer(username, word, answer){
    if(key){

      let ans = {
        "username":username,
        "word":word,
        "answer":answer
      };

      socket.emit(header.SUBMIT_ANSWER_REQ, key, ans);
    }
  }

  /**
   * @desc: Method for the host to change state.
   * @param: key, state.
   * @return:
   * **/
  ChangeState(key, state){
    socket.emit(header.CHANGE_STATE_REQ, key, state);
  }


  /********************************ANSWERS*****************************************/


  /**
   * @desc: Contains all answers from the server.
   * **/
  ServerUpdate(){//Bör enligt markus innehålla samtliga ".on"

    /**
     * @desc: Answer from server that a room has been created.
     * @param:
     * @return: unique room KEY.
     * **/
    socket.on(header.CREATE_ROOM_ANS, function (key) {
      //key from server
    });

    /**
     * @desc: Host allows/denies a player to join the game.
     * @param: username.
     * @return: true/false.
     * **/
    socket.on(header.JOIN_ROOM_REQ, function (socket, username) {
      if(players.length < maxNbrPlayers && state == header.STATE_WAIT_4_PLAYERS){
        players.push(username);
        socket.emit(header.JOIN_ROOM_ANS, socket, true, key, username);
      } else {
        socket.emit(header.JOIN_ROOM_ANS, socket, false, null, null);
      }
    });

    /**
     * @desc: Answer from server if joining a room succeeded/failed.
     * @param:
     * @return: true/false
     * **/
    socket.on(header.JOIN_ROOM_ANS, function (ans) {
      if(ans == true){
        //gör ngt
      } else {
        //gör ngt
      }
    });


    /**
     * @desc: Response from server on success/failure to submit answer OR answer from another player.
     * @param:
     * @return: true/false/JSON answer
     * **/
    socket.on(header.SUBMIT_ANSWER_ANS, function (ans) {
      if(ans == true){
        //gör ngt
      } else if(ans == false){
        //skicka igen?
      } else {
        //display
      }
    });


  }

}
