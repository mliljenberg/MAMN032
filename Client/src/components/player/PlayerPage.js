import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageAction';
import * as playerActions from '../../actions/playerAction';
import TextInput from '../common/TextInput';


class PlayerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.state = {

        message: Object.assign({}, props.message),
        player: Object.assign({}, props.player)


      };
      this.updatePlayerState = this.updatePlayerState.bind(this);
      this.savePlayer = this.savePlayer.bind(this);
    }

    updatePlayerState(event){
    let field = event.target.name;
      let player = this.state.player;

      player[field] = event.target.value;
      player['id'] = event.target.value;
      return this.setState({player: player});

    }

  savePlayer(event){
    event.preventDefault();

    this.props.actions.addPlayer(this.state.player);

  }
  updateMessageState(event){
    let field = event.target.name;
    let message = this.state.message;
    message[field] = event.target.value;
    return this.setState({message: message});

  }

  saveMessage(event){
    event.preventDefault();
    this.props.actions.addMessage(this.state.message);

  }


    render() {
      const {messages} = this.props;
      const {players} = this.props;
        return (
            <div>
              <h1>Player Page</h1>
              <ul className="list-group">
                {messages.map(message =>
                  <li className="list-group-item" key={message.id}>
                    {message.value}
                  </li>
                )}

              </ul>

              <div>


              <TextInput name="value" label="User Name" onChange={this.updateMessageState}/>

              <button className="btn btn-success" onClick={this.saveMessage}>Join Game</button>
            </div>

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

                  <button className="btn btn-success" onClick={this.savePlayer}>Join Game</button>
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
  player : PropTypes.object.isRequired
    //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {

  const message = {id:'',value:''};
  const player = {id:'',value:''};
  return {

        messages: state.messages,
        players: state.players,
        message: message,
        player: player

    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({},messageActions,playerActions), dispatch)
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
