import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageAction';
import * as playerActions from '../../actions/playerAction';
import * as roomActions from '../../actions/roomAction';
import * as mySelfActions from '../../actions/myselfAction';
import TextInput from '../common/TextInput';
import {Link, browserHistory}  from 'react-router';


class PlayerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

      message: Object.assign({}, props.message),
      player: Object.assign({}, props.player),
      room: Object.assign({}, props.room),
      myself: Object.assign({}, props.myself)


    };
    this.updatePlayerState = this.updatePlayerState.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.updateRoomState = this.updateRoomState.bind(this);

  }

  updatePlayerState(event) {

    let field = event.target.name;
    let player = this.state.player;

    player[field] = event.target.value;
    return this.setState({player: player});

  }

  updateRoomState(event) {

    let field = event.target.name;
    let room = this.state.room;

    room[field] = event.target.value;
    return this.setState({room: room});

  }


  joinRoom(event) {
    event.preventDefault();

    this.props.actions.addMyself(this.state.player);
    this.props.actions.addPlayer(this.state.player);
    this.props.actions.joinRoom(this.state.room);


    browserHistory.push('/game/' + this.state.room.id);

  }

  updateMessageState(event) {
    let field = event.target.name;
    let message = this.state.message;
    message[field] = event.target.value;
    return this.setState({message: message});

  }

  saveMessage(event) {
    event.preventDefault();
    this.props.actions.addMessage(this.state.message);

  }




  render() {
    const {messages} = this.props;
    const {players} = this.props;
    return (
      <div>

        <div>
          <ul className="list-group">
            {players.map(player =>
              <li className="list-group-item" key={player.value}>
                {player.value}
              </li>
            )}

          </ul>

          <div>


            <TextInput name="value" label="User Name" onChange={this.updatePlayerState}/>
            <TextInput name="id" label="Room" onChange={this.updateRoomState}/>

            <button className="btn btn-success" onClick={this.joinRoom}>Join Game</button>
          </div>
        </div>


      </div>
    );
  }
}

PlayerPage.propTypes = {
  message: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  myself: PropTypes.object.isRequired
  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {

  const message = {id: '', value: ''};
  const player = {id: '', value: ''};
  return {

    messages: state.messages,
    players: state.players,
    message: message,
    player: player,
    room: state.room,
    myself: state.myself

  };
}
function mapDispatchToProps(dispatch) {

  return {

    actions: bindActionCreators(Object.assign({}, messageActions, playerActions, roomActions, mySelfActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
