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

class JoinGamePage extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.state = {key: {}, username:{}};
    this.goToGame = this.goToGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goToHost = this.goToHost.bind(this);
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

   this.props.actions.joinRoom(this.state.key, this.state.username);
       $("#joinGamePage").slideToggle("slow", function () {
         browserHistory.push("/game");
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

  render() {
    return (
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
    );
  }
}
JoinGamePage.propTypes = {
  actions: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired

  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    room: state.room
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, roomActions, stateActions,playerAction), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGamePage);
