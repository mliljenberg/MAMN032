import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link, browserHistory}  from 'react-router';
import $ from 'jquery';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import * as roomActions from '../../actions/roomAction';

class HostPage extends React.Component {

 constructor(props, context){
   super(props, context);
   this.state = {

     room: Object.assign({}, props.room)


   };


 }

  render() {
    return (
      <div>
          <h1>Detta är rum: {this.props.room.id} </h1>
      </div>
    );
  }
}
HostPage.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(HostPage);

