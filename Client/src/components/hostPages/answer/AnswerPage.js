import React from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';

class AnswerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      secondsLeft: 10
    };


    this.timerID = setInterval(
      () => this.tick(),
      1000
    );


  }

  componentDidMount() {
    $("#container").slideToggle("slow", function () {

    });
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
        <div className="myLargeText">A Word</div>

        <div className="myMediumText">{this.state.secondsLeft}</div>

      </div>
    );
  }
}

export default AnswerPage;
