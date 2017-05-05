import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link, browserHistory}  from 'react-router';
import {connect} from 'react-redux';
import * as roomActions from '../../actions/roomAction';
import * as stateActions from '../../actions/stateAction';
import * as playerAction from '../../actions/playerAction';
import * as answerAction from '../../actions/answerAction';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {key: ''};

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.test = this.test.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }
/**
  componentDidUpdate() {
    if (this.props.room.id) {
      browserHistory.push("/room/" + this.props.room.id);
    }
    return true;
  }
 */

  createRoom() {
    let ans = this.props.actions.createRoom();
    console.log(ans);
  }

  handleChange(event){
    this.setState({key: event.target.value});

  }

  joinRoom(){
     this.props.actions.joinRoom(this.state.key, 'marcus');
    this.props.actions.joinRoom(this.state.key, 'ludde');

  }

  test(){
   //console.log(this.props.actions.joinRoom(this.props.room.id,'marcus'));
    //stateActions.changeState({url:'vote'});
    //this.props.actions.submitAnswer('test','test');
    this.props.actions.submitVote('marcus','test');
  }

  render() {
    return (
      <div id="total">
        <button className="btn btn-danger" onClick={this.test}>Test functions</button>
        <div className="btn btn-primary" id="joinGame" onClick={this.createRoom}>Create Game</div>
        <form onSubmit={this.handleChange}>
          <label>
            Key:
            <input type="text" value={this.state.key} onChange={this.handleChange}/>
          </label>
        </form>
        <div className="btn btn-primary" id="joinGame" onClick={this.joinRoom}>Join Game</div>
        <ul id="list"></ul>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired

  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    room: state.room
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, roomActions, stateActions,answerAction,playerAction), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

