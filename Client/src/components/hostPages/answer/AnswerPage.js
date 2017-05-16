import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as wordAction from '../../../actions/wordAction';
import * as stateAction from '../../../actions/stateAction';
import * as playerActions from '../../../actions/playerAction';
import * as hostApi from '../../../api/hostApi';



class AnswerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wordList:Object.assign([], ...props.wordList),
      word: Object.assign(({}),props.word),
      secondsLeft: 70,
      timerStarted: false
    };
    this.timerID=null;



    this.tick = this.tick.bind(this);
    this.startCountdown = this.startCountdown.bind(this);

  }

  componentDidMount() {
    $("#container").slideToggle("slow", function () {

    });

    const{players} = this.props;
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const nbr = getRandomInt(0,1)
    console.log(nbr);
    console.log(players[nbr].username);

    this.props.actions.newWord(this.props.wordList,players[nbr].username);
   hostApi.ChangeState("/answer");

    //TODO: lägg till inteligens för hur man bestämmer vem som ska få riktiga ordet.

    //wordAction.newWord(this.state.wordList,'test');


  }


  tick() {
    if (this.state.secondsLeft > 0) {
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    }
    if(this.state.secondsLeft==0){
      clearInterval(this.timerID);

        hostApi.DistributeAns(this.props.answers);
        stateAction.changeState({url:'/vote'});
      //this.props.actions.changeState({url:'/vote'});
      setTimeout(function () {
        $("#container").slideToggle("slow", function () {
          //TODO: Hantera ifall inte alla har skickat in.... kanske inte ska ske här..?
          browserHistory.push("/host/vote");
        });

      }, 1000);

    }
  }
  startCountdown(){
    $("#timer").slideToggle("slow", function () {

    });
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }



  render() {
    if(!this.state.timerStarted){
      this.startCountdown();
      this.setState({
        timerStarted: true
      });
    }

    return (
      <div id="container" className="hideFromStart">
        <div className="myMediumLargeText">{this.props.word.word}</div>

        <div className="myMediumText">{this.state.secondsLeft}</div>
        <div className="mySmallText">{this.props.answers.length+" /4 submitted"}</div>
      </div>
    );
  }
}

AnswerPage.propTypes = {
  actions: PropTypes.object.isRequired,
  wordList: PropTypes.array.isRequired,
  word: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired

  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
 /**
  let word = state.word;
  if(!state.word.word){
  word.word = "fel";
}
  */

  return {
    word: state.word,
    wordList: state.wordList,
    answers: state.answers,
    players: state.players

  };
}
function mapDispatchToProps(dispatch) {

  return {

    actions: bindActionCreators(Object.assign({},wordAction,stateAction, playerActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPage);
