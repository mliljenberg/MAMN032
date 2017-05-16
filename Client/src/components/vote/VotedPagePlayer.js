import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';
import * as answerActions from '../../actions/answerAction';
import {bindActionCreators} from 'redux';


class VotedPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);


  }


  componentDidMount() {
    $("#Container").slideToggle("slow", function () {

    });

  }


  numberOfVotes() {
    if (this.props.answers.length >= 4) {
      browserHistory.push("/score");

    }else{
      return this.props.answers.length;
    }
  }





  render() {
    return (
      <div id="Container" className="hideFromStart">
        <div className="myMediumText">Waiting on other players</div><br/>
        <div className="mySmallText" id="numberOfVotes">{this.numberOfVotes} voted</div>
      </div>
    );
  }
}
VotedPagePlayer.propTypes = {
  word: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,

};

function mapStateToProps(state, ownProps) {
  return {
    word: state.word,
    answers: state.answers,

  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, answerActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VotedPagePlayer);

