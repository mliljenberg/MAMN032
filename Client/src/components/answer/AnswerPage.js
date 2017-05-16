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
    this.submitTrueAnswer = this.submitTrueAnswer.bind(this);
  }




  componentWillMount(){
    console.log("word: "+this.props.word.username);
    console.log("myself: "+ this.props.myself.username);



    if(this.props.word.username===this.props.myself.username){
      return this.setState({
        rightAnswerHide: '',
        answerHide: 'hideFromStart',
        rightAnswer: true

      });


    }
    else{
      return this.setState({
        rightAnswerHide: 'hideFromStart',
        answerHide: ''
      });
    }
  }



  submitted() {

    //TODO: Fixa så att bara waiting container visas till hosten pushar ett nytt state.
    if($("#rightAnswerContainer").length==0){
      this.props.actions.submitAnswer(this.props.word, this.state.answer);
      $("#answerContainer").slideToggle("slow", function () {
        $("#waitingContainer").slideToggle("slow", function () {

        });
      });
    }
    else{


      $("#rightAnswerContainer").slideToggle("slow", function () {
        $("#waitingContainer").slideToggle("slow", function () {

        });
      });
    }

  }

  submitTrueAnswer(){
    this.props.actions.submitAnswer(this.props.word, this.props.word.def);
  }

  handleChange(event) {

    return this.setState({answer: event.target.value});

  }



  render() {



    return (
      <div>
        <Container submitTrueAnswer={this.submitTrueAnswer} submitted={this.submitted} handleChange={this.handleChange} word= {this.props.word} username={this.props.word.username} rightAnswer={this.props.word.username===this.props.myself.username}/>
        <div id="waitingContainer" className="hideFromStart">
          <div className="myMediumSmallText">Waiting on other players</div>
        </div>

      </div>
    );
  }


}
AnswerPagePlayer.propTypes = {
  word: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  myself: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    word: state.word,
    myself: state.myself
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, answerAction, myselfActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPagePlayer);


function Container(props){
  if(!props.username){
    return(
      <div>

      </div>
    );
  }
  else if(props.rightAnswer){

    return(
      <div id="answerContainer">
        <AnswerContainer onClick={props.submitted} onChange={props.handleChange} word={props.word.word}/>
      </div>
    );
  }
  else{
    props.submitTrueAnswer();
    return(
      <div id="rightAnswerContainer">
        <RightAnswerContainer word={props.word.word} def={props.word.def} onClick={props.submitted}/>
      </div>
    );
  }
}
