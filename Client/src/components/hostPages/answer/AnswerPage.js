import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as wordAction from '../../../actions/wordAction';


class AnswerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      wordList:Object.assign([], ...props.wordList),
      word: Object.assign(({}),props.word),
      secondsLeft: 120
    };

    //TODO: lägg till inteligens för hur man bestämmer vem som ska få riktiga ordet.

    //wordAction.newWord(this.state.wordList,'test');
  /**
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.tick = this.tick.bind(this);
*/
  }

  componentDidMount() {
    $("#container").slideToggle("slow", function () {

    });
    this.props.actions.newWord(this.props.wordList,'test');

  }

  tick() {
    if (this.state.secondsLeft > 0) {
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    }
    if(this.state.secondsLeft==0){
      setTimeout(function () {
        $("#container").slideToggle("slow", function () {
          browserHistory.push("game");
        });

      }, 1000);

    }
  }


  render() {

    return (
      <div id="container" className="hideFromStart">
        <div className="myLargeText">{this.props.word.word}</div>

        <div className="myMediumText">{this.state.secondsLeft}</div>

      </div>
    );
  }
}

AnswerPage.propTypes = {
  actions: PropTypes.object.isRequired,
  wordList: PropTypes.array.isRequired,
  word: PropTypes.object.isRequired

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
    wordList: state.wordList
  };
}
function mapDispatchToProps(dispatch) {

  return {

    actions: bindActionCreators(wordAction, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPage);
