import React from 'react';
import JoinGameInput from './JoinGameInput';
import {Link, IndexLink, browserHistory} from 'react-router';
import GameTitle from '../common/GameTitle';
import $ from 'jquery';


class JoinGamePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.goToGame = this.goToGame.bind(this);
  }

  goToGame() {
    $("#joinGamePage").slideToggle("slow", function () {
      browserHistory.push("/game");
    });
  }

  componentDidMount() {
    $("#joinGamePage").slideToggle("slow", function () {
    });
  }

  render() {
    return (
      <div id="joinGamePage" className="hideFromStart">
        <div>
          <GameTitle/>
        </div>
        <div>
          <JoinGameInput label="Name"/>
          <JoinGameInput label="Room"/>
          <div className="col-xs-12">
            <div className="col-md-3 col-xs-0"></div>

            <button className="myJoinButton col-md-6 col-xs-12" onClick={this.goToGame}>Join</button>

            <div className="col-md-3 col-xs-0"></div>
          </div>
          <div className="col-xs-12">
            <div className="col-md-3 col-xs-0"></div>
            <button className="myCreateButton col-md-6 col-xs-12">Create Game</button>
            <div className="col-md-3 col-xs-0"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinGamePage;
