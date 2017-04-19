import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link, browserHistory}  from 'react-router';
import $ from 'jquery';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import * as roomActions from '../../actions/roomAction';

const socket = io.connect();

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

      room: Object.assign({}, props.room)


    };
    this.createRoom = this.createRoom.bind(this);


  }


  componentDidUpdate(){

    if(this.props.room.id) {

      browserHistory.push("/room/"+this.props.room.id);
    }
    return true;
  }

  handleClick(){

  }


  createRoom(){
    this.props.actions.createRoom();
  }


  render() {
    return (
    <div id="total">

      <div className="btn btn-primary" id="joinGame" onClick={this.createRoom}>Create Game</div>

      <div className="btn btn-primary" id="joinGame" onClick={this.handleClick}>Join Game</div>
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



  return {
    room: state.room
  };
}
function mapDispatchToProps(dispatch) {

  return {

    actions: bindActionCreators(Object.assign({}, roomActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

