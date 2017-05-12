import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import JoinGameInput from './JoinGameInput';
import {Link, IndexLink, browserHistory} from 'react-router';
import GameTitle from '../common/GameTitle';
import $ from 'jquery';
import {bindActionCreators} from 'redux';
import CenteredButton from '../common/CenteredButton';
import * as roomActions from '../../actions/roomAction';
import * as stateActions from '../../actions/stateAction';
import * as playerAction from '../../actions/playerAction';
import * as myselfAction from '../../actions/myselfAction';
import DescriptionContainer from '../game/DescriptionContainer';

class JoinGamePage extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {key: {}, username:{}};
    this.goToGame = this.goToGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToHost = this.goToHost.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
  }




  componentDidMount() {
    $("#joinGamePage").slideToggle("slow", function () {
    });
  }

  handleChange(event){
    console.log(this.state);
    const field = event.target.name;
    let val={};
    val[field] =  event.target.value;
    return this.setState(val);

  }
  goToGame() {


       $("#joinGamePage").slideToggle("slow", function () {
         $("#descriptionContainer").slideToggle("slow", function () {

         });
       });

  }

  goToHost() {
    this.props.actions.createRoom();
    console.log(this.props.actions.room);

    $("#joinGamePage").slideToggle("slow", () => {
      console.log(this.props.room);
      browserHistory.push("/host/game");
    });
  }

  startAnimation() {

    this.props.actions.addMyself({username: this.state.username});
    this.props.actions.joinRoom(this.state.key, this.state.username);
    $("#descriptionContainer").slideToggle("slow", function () {
      browserHistory.push("/game");
    });
  }

  render() {
    return (
      <div>
        <div id="descriptionContainer" className="hideFromStart">
          <DescriptionContainer onClick={this.startAnimation}/>
        </div>
        <div id="joinGamePage" className="hideFromStart">
          <div>
            <GameTitle/>
          </div>
          <div>
            <JoinGameInput name="username" label="Name" onChange={this.handleChange}/>
            <JoinGameInput name="key" label="Room" onChange={this.handleChange}/>

            <CenteredButton onClick={this.goToGame} label="Join" color="Green"/>


            <CenteredButton onClick={this.goToHost} label="Create Game" color="White"/>

          </div>
        </div>
      </div>

    );
  }
}
JoinGamePage.propTypes = {
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
    actions: bindActionCreators(Object.assign({}, roomActions, stateActions,playerAction,myselfAction), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGamePage);
