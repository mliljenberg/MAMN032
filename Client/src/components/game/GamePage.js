import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
const socket = io.connect();
import $ from 'jquery';
import * as myselfAction from '../../actions/myselfAction';
import {Link, IndexLink} from 'react-router';


class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);


    socket.emit('join room', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
    console.log("Trying to join room/client");

    socket.on('new message', function () {
      $('#list').append('<li> Tryckte på knappen </li>');
    });


  }

  buttonClicked() {
    socket.emit('send message', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));

  }


  render() {
    const {players} = this.props;
    return (
      <div>
        <div className="myMediumText">Room: 1234</div>
        <ul className="horizontalList">
          {players.map(player =>
            <li className="horizontalListItem" key={player.value}>
              <div className="mySmallText col-xs-4"> {player.value}</div>
            </li>
          )}

        </ul>
        <div className="col-md-3 col-xs-0"></div>
        <Link to="/game"> <button className="myNeutralButton col-md-6 col-xs-12">Leave</button></Link>
        <div className="col-md-3 col-xs-0"></div>
      </div>
    );
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
