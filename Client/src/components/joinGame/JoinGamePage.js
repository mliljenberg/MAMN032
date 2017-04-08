import React from 'react';
import JoinGameInput from './JoinGameInput';
import {Link, IndexLink} from 'react-router';
import GameTitle from '../common/GameTitle';


class JoinGamePage extends React.Component {
  render() {
    return (
      <div>
        <GameTitle/>
        <JoinGameInput label="Name"/>
        <JoinGameInput label="Room"/>
        <div className="col-xs-12">
          <div className="col-md-3 col-xs-0"></div>
          <Link to="/game"> <button className="myJoinButton col-md-6 col-xs-12">Join</button></Link>
          <div className="col-md-3 col-xs-0"></div>
        </div>
        <div className="col-xs-12">
          <div className="col-md-3 col-xs-0"></div>
          <button className="myCreateButton col-md-6 col-xs-12">Create Game</button>
          <div className="col-md-3 col-xs-0"></div>
        </div>
      </div>
    );
  }
}

export default JoinGamePage;
