import React from 'react';
import $ from 'jquery';

class VoteResult extends React.Component {

  componentDidMount() {


    for (var i = 0; i < 4; i++) {
      $("#allVotes").append($("<div/>", {
        class: 'voteBoxUnhidden col-xs-12 col-md-6'
      }).append($("<div/>", {
        class: 'centeredText voteBoxText',
        text: 'HEJHÅ'
      })).append($("<div/>", {
        class: 'authorName',
        text: 'Joel'
      })));

    }


    $("#theWordMeans").slideToggle("slow", function () {
      setTimeout(function () {
        $("#voteBox").slideToggle("slow", function () {
          setTimeout(function () {
            $("#voteBox").slideToggle("slow", function () {
              $("#allVotes").slideToggle("slow", function () {

              });
            });
          }, 1); //8000
        });
      }, 1);//3000
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
