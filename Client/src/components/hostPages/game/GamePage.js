import React,{PropTypes} from 'react';
import PlayersContainer from '../../game/PlayersContainer';
import {connect} from 'react-redux';
import $ from 'jquery';
import * as roomActions from '../../../actions/roomAction';
import * as stateActions from '../../../actions/stateAction';
import * as playerAction from '../../../actions/playerAction';
import {bindActionCreators} from 'redux';
import {Link, IndexLink, browserHistory} from 'react-router';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      secondsLeft: 10,
      timerStarted: false
    };
    this.timerID = null;
    this.tick = this.tick.bind(this);
    this.startCountdown = this.startCountdown.bind(this);

  }


  tick() {

    if (this.state.secondsLeft > 0) {
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    }
    if(this.state.secondsLeft==0){
      clearInterval(this.timerID);
      setTimeout(function () {

         $("#playersContainer").slideToggle("slow", function () {
          browserHistory.push("/host/answer");

         });

      }, 1000);


    }
  }


  componentDidMount() {
    $("#playersContainer").slideToggle("slow", function () {

    });
  }

  startCountdown(){
    $("#timer").slideToggle("slow", function () {

    });
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }


  render() {
    const {players} = this.props;

    if(players.length==2){
      if(!this.state.timerStarted){
        this.startCountdown();
        this.setState({
          timerStarted: true
        });
      }

    }


    return (

      <div>
        <div id="playersContainer" className="hideFromStart">
          <PlayersContainer button="false" room={this.props.room.id}/>
          <div id="timer" className="hideFromStart">
          <div className="myMediumText">{this.state.secondsLeft}</div>
          </div>
        </div>
      </div>
    );
  }
}
GamePage.propTypes = {
  actions: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  room: PropTypes.object.isRequired

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

