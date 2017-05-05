import React from 'react';
import {browserHistory} from 'react-router';
import $ from 'jquery';


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


  }


  componentDidMount() {
    $("#voteContainer").slideToggle("slow", function () {
      setTimeout(function () {
        for (let i = 0; i < 4; i++) {
          setTimeout(function () {
            $("#listOfAnswers").append($("<div/>", {
              class: 'col-md-6 col-xs-12 voteBox',
              id: 'voteBox' + i,
              cursor: 'pointer',
              display: 'none'
            }).append($("<text/>", {
              class: 'centeredText voteBoxText',
              text: "HEJ Hej Hej HEJ Hej Hej HEJ Hej Hej HEJ Hej Hej"
            })));
            $("#voteBox" + i).slideToggle("slow", function () {

            });
          }, i * 3000);

        }

      }, 1000);
      setTimeout(function () {
        $("#timerContainer").slideToggle("slow", function () {
        });
      }, 12000);


    });


  }

  tick() {
    if (this.state.secondsLeft > 0) {
      this.setState({
        secondsLeft: this.state.secondsLeft - 1
      });
    }
    if (this.state.secondsLeft == 0) {
      setTimeout(function () {
        $("#voteContainer").slideToggle("slow", function () {
          browserHistory.push("host/score");

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


          </div>

        </div>
        <div id="timerContainer" className="hideFromStart">
          <div id="timer" className="myMediumText">{this.state.secondsLeft}</div>
        </div>
      </div>
    );
  }
}

export default VotePage;
