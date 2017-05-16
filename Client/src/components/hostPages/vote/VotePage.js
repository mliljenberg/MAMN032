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
      secondsLeft: 23

    };

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    //this.calculatePointsDiff = this.calculatePointsDiff.bind(this);
  }


  componentDidMount() {
    $("#voteContainer").slideToggle("slow", function () {

    });
   /* let points = 0;
    this.props.players.map(player=>{
      points += player.points;
    });
    this.setState({points:points});
*/

  }
  /*shouldComponentUpdate(){
    this.calculatePointsDiff();
    return true;
  }

  calculatePointsDiff(){
    //inte den mest effekiva lösning men funkar... Alternativ om man orkar är att göra en variabel i redux istället...
    let points = 0;
    this.props.players.map(player=>{
      points += player.points;
    });
    if((points-this.state.points)==this.props.players.length){
      clearInterval(this.timerID);
      setTimeout(function () {

        $("#voteContainer").slideToggle("slow", function () {
          browserHistory.push("/host/voteResult");
          stateAction.changeState({url:'/score'});

        });

      }, 1000);
    }
  }
*/
  tick() {
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


  render() {
    return (
      <div>
        <div id="voteContainer" className="hideFromStart">

          <div className="mySmallText">"The word" means</div>
          <div id="listOfAnswers" className="col-xs-12">
            {this.props.answers.map(answer =>
              <div className="col-md-6 col-xs-12"id={answer.answer} >
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
  players: PropTypes.array.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    // dina props : state.dina props
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
