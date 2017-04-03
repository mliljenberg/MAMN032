import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
const socket = io.connect();
import $ from 'jquery';


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
    return (
      <div>
        GAMEPAGE
        <br/>
        <button className="btn btn-default" onClick={this.buttonClicked}>Click me</button>
        <ul id="list"></ul>
      </div>
    );
  }


}
GamePage.propTypes = {
  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    // dina props : state.dina props
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //här bindar du alla dina actiones tror inte du behöver ändra den
    //actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
