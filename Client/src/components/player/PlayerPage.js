/**
 * Created by mliljenberg on 2017-02-16.
 */
import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import io from 'socket.io-client';

const socket = io.connect();


class PlayerPage extends React.Component {


  constructor(props, context){
    super(props, context);
    socket.emit('join room', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
    console.log("Trying to join room/client");

    socket.on('new message', function () {
      $('#list').append('<li> Tryckte på knappen </li>');
    });

  }

  getRoomName(){

    return window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  }
  buttonClicked(){
   //$('#list').append('<li> Tryckte på knappen </li>');
    socket.emit('send message', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));

  }

  render() {
    return (
      <div>
        Detta rumsnumret är {this.getRoomName()}
        <button className="btn btn-default" onClick={this.buttonClicked}>Click me</button>
        <ul id="list"></ul>
      </div>

    );
  }
}

PlayerPage.propTypes = {

};

export default PlayerPage;
