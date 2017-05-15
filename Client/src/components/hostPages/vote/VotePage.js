import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';


class VotePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      secondsLeft: 23//23
    };

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );




  }


  componentDidMount() {
    $("#voteContainer").slideToggle("slow", function () {
      setTimeout(function () {
        $("#timer").slideToggle("slow", function () {
        });

      }, 1000);


    });


  }

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


          </div>
          <div id="timer" className="myMediumText hideFromStart">{this.state.secondsLeft}</div>
        </div>

      </div>
    );
  }
}

VotePage.propTypes = {
  //myprop: PropTypes.string.isRequired
  answers: PropTypes.array.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    // dina props : state.dina props
    answers: state.answers
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //här bindar du alla dina actiones tror inte du behöver ändra den

    //actions: bindActionCreators(actions, dispatch)

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
