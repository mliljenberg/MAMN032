import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import AnswerContainer from './AnswerContainer';
import WaitingContainer from './WaitingContainer';
import RightAnswerContainer from './RightAnswerContainer';
import * as answerAction from '../../actions/answerAction';
import * as myselfActions from '../../actions/myselfAction';

class AnswerPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {ready: 0, answer: '', rightAnswerHide: 'hideFromStart', answerHide:'hideFromStart', rightAnswer:false};
    this.submitted = this.submitted.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {

  }

  componentWillUpdate(){
    if(this.props.word.username===this.props.myself.username){
      this.setState({
        rightAnswerHide: '',
        answerHide: 'hideFromStart',
        rightAnswer: true

      });

    }
    else{
      this.setState({
        rightAnswerHide: 'hideFromStart',
        answerHide: ''
      });
    }

  }

  submitted() {

    if(this.state.rightAnswer){
      $("#rightAnswerContainer").slideToggle("slow", function () {
        $("#waitingContainer").slideToggle("slow", function () {

        });
      });
    }
    else{
      this.props.actions.submitAnswer(this.props.word, this.state.answer);
      //TODO: Fixa så att bara waiting container visas till hosten pushar ett nytt state.

      $("#answerContainer").slideToggle("slow", function () {
        $("#waitingContainer").slideToggle("slow", function () {

        });
      });
    }



  }

  handleChange(event) {
    return this.setState({answer: event.target.value});

  }

  render() {


    return (
      <div>
        <div id="answerContainer" className={this.state.answerHide}>
          <AnswerContainer onClick={this.submitted} onChange={this.handleChange} word={this.props.word.word}/>
        </div>
        <div id="waitingContainer" className="hideFromStart">

          <WaitingContainer ready="0 "/>
        </div>
        <div id="rightAnswerContainer" className={this.state.rightAnswerHide}>
          <RightAnswerContainer word={this.props.word.word} def={this.props.word.def} onClick={this.submitted}/>
        </div>
      </div>
    );
  }


}
AnswerPagePlayer.propTypes = {
  word: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  myself: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    word: state.word,
    answers: state.answers,
    myself: state.myself
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, answerAction, myselfActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPagePlayer);
