import React from 'react';
import $ from 'jquery';
import {browserHistory} from 'react-router';
class VoteResult extends React.Component {




  componentDidMount() {

    var rightAnswer = 3;


    //Här skrivs alla svar ut, fadade om det inte är det riktiga, ofadade om det är det riktiga
    for (var i = 0; i < 4; i++) {
      if (i != rightAnswer) {
        $("#allVotes").append($("<div/>",{class: 'col-md-6 col-xs-12 ', id: "voteBox"+i})
        );

        $("#voteBox"+i).append($("<div/>", {
          class: 'voteBoxUnhiddenWrongAnswer'
        }).append($("<div/>", {
          class: 'centeredText voteBoxText',
          text: 'HEJHÅ'
        })).append($("<div/>", {
          class: 'authorName',
          text: 'Joel'
        })));


        //Här sätter man stämplar på svaret med namn på alla som röstat på det
        let votesOnThisAnswer=3;
        for(var j=1; j<=votesOnThisAnswer;j++){
          $("#voteBox"+i).append($("<div/>", {
            class: 'voteStamp stampMargin'+j
          }).append($("<div/>", {
            class: 'voteStampText',
            text: 'Ludde'
          })));
        }


      }

      else {

        $("#allVotes").append($("<div/>",{class: 'col-md-6 col-xs-12 ', id: "voteBox"+i})
        );

        $("#voteBox"+i).append($("<div/>", {
          class: 'voteBoxUnhidden'
        }).append($("<div/>", {
          class: 'centeredText voteBoxText',
          text: 'HEJHÅ'
        })).append($("<div/>", {
          class: 'authorName',
          text: 'Joel'
        })));


        //Här sätter man stämplar på svaret med namn på alla som röstat på det
        let votesOnThisAnswer=3;
        for(var j=1; j<=votesOnThisAnswer;j++){
          $("#voteBox"+i).append($("<div/>", {
            class: 'voteStamp stampMargin'+j
          }).append($("<div/>", {
            class: 'voteStampText',
            text: 'Ludde'
          })));
        }

      }

    }



    $("#theWordMeans").slideToggle("slow", function () {
      setTimeout(function () {
        $("#voteBox").slideToggle("slow", function () {
          setTimeout(function () {
            $("#voteBox").slideToggle("slow", function () {
              $("#allVotes").slideToggle("slow", function () {
                setTimeout(function () {
                  $("#totalContainer").slideToggle("slow", function () {
                    browserHistory.push("/host/score");
                  });
                }, 8000);
              });
            });
          }, 8000); //8000
        });
      }, 3000);//3000
    });


  }

  render() {
    return (
      <div id="totalContainer">
        <div className="mySmallText hideFromStart" id="theWordMeans">"The word" means</div>
        <div className="col-xs-12 voteBoxSingle" id="voteBox">
          <div className="centeredText voteBoxText">HEJ</div>
        </div>
        <div id="allVotes" className="hideFromStart">
        </div>
      </div>

    );
  }
}

export default VoteResult;
