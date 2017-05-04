import React from 'react';
import $ from 'jquery';

class VoteResult extends React.Component {

  componentDidMount() {
    var rightAnswer = 3;

    for (var i = 0; i < 4; i++) {
      if (i != rightAnswer) {
        $("#allVotes").append($("<div/>",{class: 'col-md-6 col-xs-12'}).append($("<div/>", {
            class: 'voteBoxUnhiddenWrongAnswer'
          }).append($("<div/>", {
            class: 'centeredText voteBoxText',
            text: 'HEJHÅ'
          })).append($("<div/>", {
            class: 'authorName',
            text: 'Joel'
          }))).append($("<div/>", {
            class: 'voteStamp',
          }).append($("<div/>", {
            class: 'voteStampText',
            text: 'Ludde'
          })))
        );
      }

      else {
        $("#allVotes").append($("<div/>", {
          class: 'voteBoxUnhidden col-xs-12 col-md-6'
        }).append($("<div/>", {
          class: 'centeredText voteBoxText',
          text: 'HEJHÅ'
        })).append($("<div/>", {
          class: 'authorName',
          text: 'Joel'
        })).append($("<div/>", {
          class: 'voteStamp',
        }).append($("<div/>", {
          class: 'voteStampText',
          text: 'Ludde'
        }))));
      }

    }


    $("#theWordMeans").slideToggle("slow", function () {
      setTimeout(function () {
        $("#voteBox").slideToggle("slow", function () {
          setTimeout(function () {
            $("#voteBox").slideToggle("slow", function () {
              $("#allVotes").slideToggle("slow", function () {

              });
            });
          }, 8000); //8000
        });
      }, 3000);//3000
    });


  }

  render() {
    return (
      <div>
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
