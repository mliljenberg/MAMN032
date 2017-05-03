import React from 'react';
import JoinGameInput from './JoinGameInput';
import {Link, IndexLink, browserHistory} from 'react-router';
import GameTitle from '../common/GameTitle';
import $ from 'jquery';
import CenteredButton from '../common/CenteredButton';

class JoinGamePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.goToGame = this.goToGame.bind(this);
  }


  componentDidMount() {
    $("#joinGamePage").slideToggle("slow", function () {
    });
  }

  goToGame() {
    $("#joinGamePage").slideToggle("slow", function () {
      browserHistory.push("/game");
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

          <CenteredButton onClick={this.goToGame} label="Join" color="Green"/>


          <CenteredButton onClick={this.goToGame} label="Create Game" color="White"/>

        </div>
      </div>
    );
  }
}

export default JoinGamePage;
