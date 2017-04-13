import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
const socket = io.connect();

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    socket.on('new message', function(data) {

      $('#list').append('<li> '+data.name+ " joined the game in room "+data.room +'</li>');
    });



  }

  handleClick(){
    socket.emit('send message', {name: $('#playerName').val(), room: $('#roomKey').val()});
    $('#joinGame').remove();
    $('#playerName').remove();
    $('#roomKey').remove();

  }


  render() {
    return (
    <div id="total">
      Name: <input label="Name" type="text" name="" id="playerName"/><br/>
      Room: <input label="Key" type="text" name="" id="roomKey"/>
      <div className="btn btn-primary" id="joinGame" onClick={this.handleClick}>Join Game</div>
    <ul id="list"></ul>

  </div>




  );
  }
}

export default HomePage;
