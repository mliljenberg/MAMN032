import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import VoteBox from './VoteBox';

class VotePagePlayer extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.componentDidMount = this.componentDidMount.bind(this);


    $(document).ready(function () {

      $(document).on("click", "div", function (event) {
        if (event.target.id.startsWith("vote")) {
          console.log(event.target.id.substring(4, event.target.id.length));
          $("#voteContainer").slideToggle("slow", function () {
            browserHistory.push('voted');
          });


        }
      });

    });

  }

  componentDidMount() {
    $("#voteContainer").slideToggle("slow", function () {
      setTimeout(function () {

      }, 1000);
    });


  }


  render() {


    return (
      <div>
        <div id="voteContainer" className="hideFromStart">

          <div className="mySmallText" id="text">"The word" means</div>
          <div id="listOfAnswers" className="col-xs-12">

            {this.props.answers.map(answer =>
              <div className="col-md-6 col-xs-12 hej" id={"vote1" + answer.answer}>
                <div className="voteBoxUnhidden" id={"vote2" + answer.answer}>
                  <div className="centeredText voteBoxText" id={"vote3" + answer.answer}>{answer.answer}</div>
                </div>
              </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(VotePagePlayer);
