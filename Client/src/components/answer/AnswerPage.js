import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import AnswerContainer from './AnswerContainer';
import WaitingContainer from './WaitingContainer';
import RightAnswerContainer from './RightAnswerContainer';
import * as answerAction from '../../actions/answerAction';

class AnswerPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {ready: 1, answer:''};
    this.submitted = this.submitted.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  componentDidMount() {

    $("#answerContainer").slideToggle("slow", function () {

    });
  }
  submitted() {
      this.props.actions.submitAnswer(this.props.word,this.state.answer);
    //TODO: Fixa så att bara waiting container visas till hosten pushar ett nytt state.

      $("#answerContainer").slideToggle("slow");
      $("#waitingContainer").slideToggle("slow");
        /*
        setTimeout(function () {
          $("#waitingContainer").slideToggle("slow", function () {
            browserHistory.push("/vote");
          });

        }, 3000);**/



  }
handleChange(event){
    return this.setState({answer:event.target.value});

}

  render() {
    return (
      <div>
        <div id="answerContainer" className="hideFromStart">
          <AnswerContainer onClick={this.submitted} onChange={this.handleChange} word={this.props.word.word}/>
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
  word: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
  word: state.word
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, answerAction), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPagePlayer);
