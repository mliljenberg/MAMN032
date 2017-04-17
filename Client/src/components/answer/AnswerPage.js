import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import AnswerContainer from './AnswerContainer';
import WaitingContainer from './WaitingContainer';
import RightAnswerContainer from './RightAnswerContainer';

class AnswerPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {ready: 1};
    this.submitted = this.submitted.bind(this);
  }

  submitted() {
    $("#answerContainer").slideToggle("slow", function () {
      $("#waitingContainer").slideToggle("slow", function () {
       setTimeout(function () {
          $("#waitingContainer").slideToggle("slow", function () {
            browserHistory.push("/vote");
          });

        }, 3000);
      });
    });
  }

  componentDidMount() {

    $("#answerContainer").slideToggle("slow", function () {

    });
  }


  render() {
    return (
      <div>
        <div id="answerContainer" className="hideFromStart">
          <AnswerContainer onClick={this.submitted}/>
        </div>
        <div id="waitingContainer" className="hideFromStart">
          <WaitingContainer ready={this.state.ready}/>
        </div>
        <div id="rightAnswerContainer" className="hideFromStart">
          <RightAnswerContainer/>
        </div>
      </div>
    );
  }


}
AnswerPagePlayer.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPagePlayer);
