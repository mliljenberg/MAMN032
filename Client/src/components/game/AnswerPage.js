import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';

class AnswerPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { ready: 1};
    this.submitted = this.submitted.bind(this);
  }

  submitted(){
    $("#answerContainer").slideToggle("slow", function () {
      $("#waitingContainer").slideToggle("slow", function () {

        setTimeout(function () {
          $("#waitingContainer").slideToggle("slow", function () {
            browserHistory.push("/vote");
          });

        }, 3000);
      });
    });
  }

  componentDidMount(){

    $("#answerContainer").slideToggle("slow", function () {

    });
  }


  render() {
    return (
      <div>
        <div id="answerContainer" className="hideFromStart">
          <div className="myLargeText">Word</div>
          <div className="col-xs-12">
            <div className="col-xs-0 col-md-2"></div>
            <textarea className="descriptionInput col-xs-12 col-md-8"></textarea>
            <div className="col-xs-0 col-md-2"></div>
          </div>
          <div className="col-xs-12">
            <div className="col-xs-0 col-md-2"></div>
            <button className="myJoinButton col-xs-12 col-md-8" onClick={this.submitted}>Submit</button>
            <div className="col-xs-0 col-md-2"></div>
          </div>
        </div>
        <div id="waitingContainer" className="hideFromStart" >
          <div className="myMediumText">Waiting on other players</div> <br/>
         <div className="mySmallText">{this.state.ready}/4 submitted</div>
        </div>
        <div id="rightAnswerContainer" className="hideFromStart">
          <div className="myMediumSmallText">You have the true description</div>
          <div className="col-xs-12 myMargin"></div>
          <div className="mySmallText myMargin">A word means blablablabla A word means blablablabla</div>
          <div className="col-md-3"></div>
          <button className="myNeutralButton col-xs-12 col-md-6">Submit</button>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }


}
AnswerPagePlayer.propTypes = {
  //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    // dina props : state.dina props
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //här bindar du alla dina actiones tror inte du behöver ändra den

    //actions: bindActionCreators(actions, dispatch)

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPagePlayer);
