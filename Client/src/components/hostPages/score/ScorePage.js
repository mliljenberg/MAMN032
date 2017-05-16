import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import ScoreContainer from '../../score/ScoreContainer';
import ScoreBoardContainer from '../../score/ScoreBoardContainer';
import * as hostApi from '../../../api/hostApi';
import * as stateAction from '../../../actions/stateAction';
import * as answerAction from '../../../actions/answerAction';


class ScorePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player),
      secondsLeft: 10,
      weHaveAWinner:false
    };
    this.timerID = null;


    this.tick = this.tick.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);




  }

  goToNextPage() {
    clearInterval(this.timerID);
    hostApi.DistributeAns(this.props.answers);
    this.props.actions.clearAnswers();
    //this.props.actions.changeState({url:'/vote'});
    setTimeout(function () {
      $("#container").slideToggle("slow", function () {
        //TODO: Hantera ifall inte alla har skickat in.... kanske inte ska ske här..?


        browserHistory.push("/host/answer");
      });

    }, 1000);
  }

  tick() {
    if (this.state.secondsLeft > 0) {
      this.setState({

        secondsLeft: this.state.secondsLeft - 1
      });
    }
    if (this.state.secondsLeft == 0) {
      this.props.actions.clearAnswers();
      clearInterval(this.timerID);
      console.log("Gå till answer igen");
      setTimeout(function () {
        $("#container").slideToggle("slow", function () {
          //TODO: Hantera ifall inte alla har skickat in.... kanske inte ska ske här..?
          browserHistory.push("/host/answer");
        });

      }, 1000);

    }
  }

  startCountdown() {

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentDidMount() {

    for(let i =0; i<this.props.players.length; i++){
      if(Number(this.props.players[i].points)>=15){
        clearInterval(this.timerID);
        console.log("Ska finnas en vinnare");
        browserHistory.push('/host/result');
      }
    }


    this.startCountdown();
    $("#scoreBoardContainer").slideToggle("slow", function () {


    });


  }

  clickedReady() {
    $("#scoreBoardContainer").slideToggle("slow", function () {
      browserHistory.push('/answer');
    });

  }

//Detectade ingen förändring..
  render() {
    return (
      <div id="container">
        <div id="scoreBoardContainer" className="hideFromStart">
          <ScoreBoardContainer show="no" onClick={this.clickedReady}/>
          <div className="myMediumText">{this.state.secondsLeft}</div>
        </div>

      </div>
    );
  }


}
ScorePage.propTypes = {
  players: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  const player = {id: '', value: ''};
  return {
    players: state.players,
    player: player
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, stateAction, answerAction), dispatch)
  };

}


export default connect(mapStateToProps, mapDispatchToProps)(ScorePage);
