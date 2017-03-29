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
      this.savePlayer = this.savePlayer.bind(this);
    }

    addPlayer(event){
    let field = event.target.value;
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

              <TextInput name="input" label="User Name" onChange={this.addPlayer}/>

              <button className="btn btn-success" onClick={this.addPlayer}>Join Game</button>
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
    return {
        messages: state.messages,
        message: state.message
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
