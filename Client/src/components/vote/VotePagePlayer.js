import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import VoteBox from './VoteBox';
import * as playerAction from '../../actions/playerAction';
import * as playerApi from '../../api/playerApi';

class VotePagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    if(props.word.username == props.myself.username){
      browserHistory.push('voted');
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      answers: Object.assign([], props.answers),
      points:0,
      word: Object.assign(({}),props.word)

    };


    this.voteClicked = this.voteClicked.bind(this);


  }
/*
  componentWillMount(){
    console.log("------------------------------");
    console.log(this.props);
    if(this.props.myself.username === this.props.word.username){


    }
  }*/

  componentDidMount() {

    $("#voteContainer").slideToggle("slow", function () {
      setTimeout(function () {

      }, 1000);
    });


  }


  voteClicked(answer){
    event.preventDefault();
    playerApi.SubmitVote(answer.username, answer.answer);
    $("#voteContainer").slideToggle("slow", function () {
             browserHistory.push('voted');
          });
  }


  render() {
    let IHaveAnswered=0;
    for(let i =0; i<this.props.answers.length; i++){
     if(this.props.answers[i].username==this.props.myself.username){
       IHaveAnswered=1;
     }
    }

    let nmbrOfAnswers=this.props.answers.length-IHaveAnswered;
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

          <div className="mySmallText" id="text">"{this.props.word.word}" means</div>
          <div id="listOfAnswers" className="col-xs-12">
            {this.props.answers.map(answer => {
              if(answer.username !== this.props.myself.username) {
                return (
                  <div className={width+ " col-xs-12 hej"} word={answer.answer} name={answer.username}
                       onClick={() => this.voteClicked(answer)} id={"vote1" + answer.answer}>
                    <div className="voteBoxUnhidden" word={answer.answer} name={answer.username}
                         id={"vote2" + answer.answer}>
                      <div className="centeredText voteBoxText" word={answer.answer} name={answer.username}
                           id={"vote3" + answer.answer}>{answer.answer}</div>
                    </div>
                  </div>
                )
              }else{
                return(<div></div>);
              }
              }
            )
            }


          </div>

        </div>
        <div id="waitContainer" className="hideFromStart">
          WAITING
        </div>
      </div>

    );
  }


}
VotePagePlayer.propTypes = {
  //myprop: PropTypes.string.isRequired
  answers: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  myself: PropTypes.object.isRequired,
  word: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {

  return {
    // dina props : state.dina props
    answers: state.answers,
    myself: state.myself,
    word: state.word
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //här bindar du alla dina actions tror inte du behöver ändra den
    actions: bindActionCreators(Object.assign({}, playerAction), dispatch)

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VotePagePlayer);
