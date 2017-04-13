import React from 'react';
import {Link} from 'react-router';
import io from 'socket.io-client';
import * as header from '../../headerConstants';
let socket = io.connect();

class HostPage extends React.Component {

 constructor(props, context){
   super(props, context);

   socket.on(header.CREATE_ROOM_ANS, function (data) {
       console.log(data);
       return 1;
   });

 }

 handleClick(){
   socket.emit(header.CREATE_ROOM_REQ);
 }

  render() {
    return (
      <div>
        <div className="btn btn-primary" id="createGame" onClick={this.handleClick}>Create Game</div>
      </div>
    );
  }
}

export default HostPage;
