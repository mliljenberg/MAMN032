import React,{PropTypes} from 'react';
import PlayersContainer from '../../game/PlayersContainer';
import {connect} from 'react-redux';
import $ from 'jquery';
import * as roomActions from '../../../actions/roomAction';
import * as stateActions from '../../../actions/stateAction';
import * as playerAction from '../../../actions/playerAction';
import {bindActionCreators} from 'redux';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    $(document).ready(function () {
      var audio = $("#clickSound")[0];




      audio.play();

    });
  }


  componentDidMount() {
    $("#playersContainer").slideToggle("slow", function () {

    });
  }


  render() {


    return (

      <div>
        <div id="playersContainer" className="hideFromStart">
          <PlayersContainer button="false" room={this.props.room.id}/>


        </div>
      </div>
    );
  }
}
GamePage.propTypes = {
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
    actions: bindActionCreators(Object.assign({}, roomActions, stateActions,playerAction), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);

