/**
 *API which contains methods for HOST and CLIENT to communicate with the server.
 * **/

import io from 'socket.io-client';
import * as header from '../headerConstants';

let roomId;
let words = []; //Koppla till redux!
let players = []; // Koppla till redux!

let instance = null; //socket

class NetworkHandler{

  /**
   * @desc: Creation of a NetworkHandler, this is a singleton class.
   * @param:
   * @return:
   * **/
  constructor(){
    if(!instance){
      instance = io.connect();
    }
  }

  /**
   * @desc: Method to create room
   * @param:
   * @return:
   * **/
  CreateRoom(){
    instance.emit(header.CREATE_ROOM_REQ);
  }

  /**
   * @desc: Method to join a room
   * @param: Unique KEY to a room.
   * @return:
   * **/
  JoinRoom(key){
    roomId = key;
    instance.emit(header.JOIN_ROOM_REQ, key);
  }

  SendMessage(username, message){
    let msg = {
      "username":username,
      "message":message
    };

    instance.emit(header.SEND_MESSAGE_REQ, msg);
  }

  /**
   * @desc: Contains all answers from the server.
   * **/
  ServerUpdate(){//Bör enligt markus innehålla samtliga ".on"
    instance.on(header.CREATE_ROOM_ANS, function () {

    });

    instance.on(header.JOIN_ROOM_ANS, function () {

    });
  }

}
