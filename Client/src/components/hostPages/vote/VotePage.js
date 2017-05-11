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

        var numberOfVotes = 4;
        var voteWidth="";
        switch(numberOfVotes) {
          case 1:
            voteWidth = "col-xs-12";
            break;
          case 2:
            voteWidth = "col-xs-12 col-md-6"
            break;
          case 3:
            voteWidth = "col-xs-12 col-md-4"
            break;
          case 4:
            voteWidth = "col-xs-12 col-md-6"
            break;
          default:
        }


        for (let i = 0; i < numberOfVotes; i++) {
          setTimeout(function () {

            $("#listOfAnswers").append($("<div/>",{class: 'col-md-6 col-xs-12 ', id: "voteBox"+i})
            );

            $("#voteBox"+i).append($("<div/>", {
              id: 'vote'+i,
              class: 'voteBoxUnhidden hideFromStart',
              cursor: 'pointer'

            }).append($("<div/>", {
              class: 'centeredText voteBoxText',
              text: 'HEJHÅ'
            })));
            $("#vote" + i).slideToggle("slow", function () {
              if(i==numberOfVotes-1){
                $("#timer").slideToggle("slow", function () {
                });
              }
            });

          }, i * 3000);

        }

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



          </div>
          <div id="timer" className="myMediumText hideFromStart">{this.state.secondsLeft}</div>
        </div>

      </div>
    );
  }
}

export default VotePage;
