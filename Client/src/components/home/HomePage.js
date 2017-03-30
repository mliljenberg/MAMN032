import React from 'react';
import {Link, browserHistory}  from 'react-router';
import io from 'socket.io-client';
import $ from 'jquery';

const socket = io.connect();


class HomePage extends React.Component {

  constructor(props,context){
    super(props,context);

  }


  buttonClicked(){

    browserHistory.push('/room/'+$("#roomInput").val());
  }



  render() {
    return (
      <div className="jumbotron">
        <h1>Spel</h1>
        <input type="text" id="roomInput" className="form-control" placeholder="Search for..."  />
        <Link to="host" className="btn btn-primary btn-lg col-xs-6">Create Game</Link>
        <button className="btn btn-primary btn-lg col-xs-6" onClick={this.buttonClicked}>Join Game</button>

      </div>

    );
  }
}

export default HomePage;
