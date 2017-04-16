import React from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';
import * as header from '../../headerConstants';
let socket = io.connect();
let key = '';

class HostPage extends React.Component {

 constructor(props, context){
   super(props, context);

   socket.on(header.CREATE_ROOM_ANS, function (data) {
     key = data;
     console.log(data);
     //return 1;
   });

   socket.on(header.JOIN_ROOM_ANS, function (data) {
     console.log(data);
   });

 }

 handleClickCreate(){
   socket.emit(header.CREATE_ROOM_REQ);
 }

 handleClickJoin(){
   socket.emit(header.JOIN_ROOM_REQ, key);
 }

  render() {
    return (
      <div>
        <div className="btn btn-primary" id="createGame" onClick={this.handleClickCreate}>Create Game</div>
        <div className="btn btn-primary" id="joinGame" onClick={this.handleClickJoin}>Join Game</div>
      </div>
    );
  }
}

export default HostPage;
