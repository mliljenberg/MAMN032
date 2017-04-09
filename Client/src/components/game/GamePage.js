import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
const socket = io.connect();
import $ from 'jquery';
import * as myselfAction from '../../actions/myselfAction';
import {Link, IndexLink} from 'react-router';

import Description from './Description';


class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {ready: false, leftOver: 0};
    socket.emit('join room', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
    console.log("Trying to join room/client");
    this.render = this.render.bind(this);
    this.changeReady = this.changeReady.bind(this);
    socket.on('new message', function () {
      $('#list').append('<li> Tryckte på knappen </li>');
    });


  }

  buttonClicked() {
    socket.emit('send message', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));

  }

  changeReady() {
    return this.setState({ready: true});

  }


  render() {
    const {players} = this.props;
    let leftOverRow1 = "";
    let leftOverClass = "horizontalListItem center-block col-xs-4"


    this.state.leftOver = players.length % 3;
    if (this.state.leftOver === 0) {
      leftOverRow1 = <div className="col-xs-0"></div>;

    }
    if (this.state.leftOver === 1) {
      leftOverRow1 = <div className="col-xs-0"></div>;
      leftOverClass = "horizontalListItem myMargin center-block col-xs-3"

    }
    if (this.state.leftOver === 2) {
      leftOverRow1 = <div className="col-xs-2"></div>;

    }

    if (this.state.ready) {
      return (
        <div>

          <div className="myMediumLargeText">Room: 1234</div>
          <div className="col-xs-12">
            <div className="col-xs-0 col-md-2"></div>
            <div className="horizontalList col-xs-12 col-md-8">
              {leftOverRow1}
              {players.map(player =>
                <div className={leftOverClass} key={player.value}>

                  <div className="mySmallText"> {player.value}</div>

                </div>
              )}

            </div>
            <div className="col-xs-0 col-md-2"></div>
          </div>

          <div className="col-xs-12 myMargin">
            <div className="col-md-3 col-xs-0"></div>

            <Link to="/game">
              <button className="myNeutralButton col-md-6 col-xs-12">Leave</button>
            </Link>
            <div className="col-md-3 col-xs-0"></div>
          </div>
        </div>);
    } else {
      return (
        <div >
          <div className="col-xs-12">
            <div className="col-xs-0 col-md-3"></div>
            <div className="description col-xs-12 col-md-6">

              <div className="myMediumText">Game</div>
              <div className="myMargin"></div>

              {Description[0].description}<br/><br/>
              {Description[1].description}<br/><br/>
              {Description[2].description}

            </div>

            <div className="col-xs-0 col-md-3"></div>
          </div>
          <div className="col-xs-0 col-md-3"></div>
          <button className="myJoinButton col-xs-12 col-md-6" onClick={this.changeReady}>OK</button>
          <div className="col-xs-0 col-md-3"></div>
        </div>
      );
    }
  }
}


GamePage.propTypes = {


  myself: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired

};

function mapStateToProps(state, ownProps) {

  return {

    myself: state.myself,
    players: state.players

  };
}
function mapDispatchToProps(dispatch) {
  return {

    actions: bindActionCreators(Object.assign({}, myselfAction), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
