import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
const socket = io.connect();
import $ from 'jquery';
import * as myselfAction from '../../actions/myselfAction';
import {Link, IndexLink, browserHistory} from 'react-router';
import DescriptionContainer from './DescriptionContainer';
import PlayersContainer from './PlayersContainer';



class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { leftOver: 0};
    socket.emit('join room', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
    console.log("Trying to join room/client");
    this.render = this.render.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    socket.on('new message', function () {
      $('#list').append('<li> Tryckte på knappen </li>');
    });


  }


  startAnimation() {


    $("#descriptionContainer").slideToggle("slow", function () {
      $("#playersContainer").slideToggle("slow", function () {
        setTimeout(function () {
          $("#playersContainer").slideToggle("slow", function () {
              browserHistory.push("/answer");
          });
        }, 3000);
      });


    });
  }

  leaveGame(){
    $("#playersContainer").slideToggle("slow", function () {
      browserHistory.push("/joinGame");
    });
  }



  componentDidMount(){
    $("#descriptionContainer").slideToggle("slow", function () {

    });
  }

  render() {


      return (
        <div>
          <div id="descriptionContainer" className="hideFromStart">
          <DescriptionContainer onClick={this.startAnimation}/>
          </div>

          <div id="playersContainer" className="hideFromStart">
          <PlayersContainer onClick={this.leaveGame}/>



          </div>
        </div>
      );
    }




}



export default GamePage;
