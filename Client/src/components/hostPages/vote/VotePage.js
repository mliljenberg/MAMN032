import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as stateAction from '../../../actions/stateAction';
import $ from 'jquery';
import * as hostApi from '../../../api/hostApi';
import {bindActionCreators} from 'redux';


class VotePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      secondsLeft: 60,
      word: Object.assign(({}),props.word),
      shuffledList: []
    };
    this.shuffle = this.shuffle.bind(this);



    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    //this.calculatePointsDiff = this.calculatePointsDiff.bind(this);
  }


  componentDidMount() {
    this.shuffle(this.props.answers);

    $("#voteContainer").slideToggle("slow", function () {

    });

  }

  tick() {
    let counter =1;
    console.log("Answers: "+ this.props.answers.length);
    for(let i=0; i<this.props.answers.length; i++){

      counter += this.props.answers[i].voted.length;
      console.log("Counter: "+counter);
      if(counter>=this.props.players.length){
        clearInterval(this.timerID);
        setTimeout(function () {
          $("#voteContainer").slideToggle("slow", function () {
            stateAction.changeState({url:'/score'});
            browserHistory.push("/host/voteResult");
          });
        }, 1000);

      }
    }

    if (this.state.secondsLeft > 0) {
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    }
    if (this.state.secondsLeft == 0) {
      clearInterval(this.timerID);
      setTimeout(function () {

        $("#voteContainer").slideToggle("slow", function () {
         // hostApi.ChangeState("")
          stateAction.changeState({url:'/score'});
          browserHistory.push("/host/voteResult");

        });

      }, 1000);


    }
  }


  shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  this.setState({shuffledList:a});
}


  render() {
    let nmbrOfAnswers=this.props.answers.length;
    let width= "col-md-6";
    if(nmbrOfAnswers==1){
      width="col-md-12";
    }
    else if(nmbrOfAnswers==3){
      width="col-md-4";
    }

    return (
      <div>
        <div id="voteContainer" className="hideFromStart">

          <div className="mySmallText">"{this.props.word.word}" means</div>
          <div id="listOfAnswers" className="col-xs-12">
            {this.state.shuffledList.map(answer =>
              <div className={width+ " col-xs-12"} id={answer.answer} >
                <div className="voteBoxUnhidden " >
                  <div className="centeredText voteBoxText" >{answer.answer}</div>
                </div>
              </div>
            )
            }

            <div className="myMediumText">{this.state.secondsLeft}</div>
          </div>

        </div>

      </div>
    );
  }
}

VotePage.propTypes = {
  //myprop: PropTypes.string.isRequired
  answers: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  word: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    // dina props : state.dina props
    word: state.word,
    answers: state.answers,
    players: state.players
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //här bindar du alla dina actiones tror inte du behöver ändra den

    //actions: bindActionCreators(actions, dispatch)
    actions: bindActionCreators(Object.assign({},stateAction), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
