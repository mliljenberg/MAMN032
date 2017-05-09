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
import * as roomActions from '../../actions/roomAction';
import * as stateActions from '../../actions/stateAction';
import * as playerAction from '../../actions/playerAction';



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


    this.leaveGame = this.leaveGame.bind(this);

  }



  startAnimation() {


    $("#descriptionContainer").slideToggle("slow", function () {
      $("#playersContainer").slideToggle("slow", function () {

      });


    });
  }

  leaveGame(){
    $("#playersContainer").slideToggle("slow", function () {
      browserHistory.push("");
    });
  }

  componentWillMount(){

    if(this.props.room.id == null){
      browserHistory.push("/");
      alert("Room does not exist");
    }
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
          <PlayersContainer onClick={this.leaveGame} button="true"/>



          </div>
        </div>
      );
    }




}

GamePage.propTypes = {
  actions: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired

  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
  console.log(state);

  return {
    room: state.room,
    players: state.players

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, roomActions, stateActions,playerAction), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
