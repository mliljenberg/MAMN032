import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
const socket = io.connect();
import $ from 'jquery';
import * as myselfAction from '../../actions/myselfAction';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    socket.emit('join room', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
    console.log("Trying to join room/client");


    socket.on('new message', function () {
      $('#list').append('<li> Tryckte på knappen </li>');
    });
  }

  buttonClicked(){
    socket.emit('send message', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));

  }

  render() {
    const {players} = this.props;

    return (
      <div>
        <ul className="list-group">
          {players.map(player =>
            <li className="list-group-item" key={player.value}>
              {player.value}
            </li>
          )}

        </ul>

        <ul id="list"></ul>
      </div>
    );
  }


}
GamePage.propTypes = {



  myself : PropTypes.object.isRequired,
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

    actions: bindActionCreators(Object.assign({},myselfAction), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
