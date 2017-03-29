import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageAction';
import TextInput from '../common/TextInput';


class PlayerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.state = {

        message: Object.assign({}, props.message)

      };
      this.updatePlayerState = this.updatePlayerState.bind(this);
      this.savePlayer = this.savePlayer.bind(this);
    }

    updatePlayerState(event){
    let field = event.target.name;
      let message = this.state.message;
      message[field] = event.target.value;
      return this.setState({message: message});

    }

  savePlayer(event){
    event.preventDefault();
    this.props.actions.addMessage(this.state.message);
  }


    render() {
      const {messages} = this.props;
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

              <TextInput name="value" label="User Name" onChange={this.updatePlayerState}/>

              <button className="btn btn-success" onClick={this.savePlayer}>Join Game</button>
            </div>
            </div>
        );
    }


}
PlayerPage.propTypes = {
  message: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired
    //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
  const message = {id:'3',value:''};
  return {
        messages: state.messages,
        message: message

    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
