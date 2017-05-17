import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import * as wordAction from '../../../actions/wordAction';
class VoteResult extends React.Component {


  componentDidMount() {
    /*
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

     */

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
    let nmbrOfAnswers=this.props.answers.length;
    let width= "col-md-6";
    if(nmbrOfAnswers==1){
      width="col-md-12";
    }
    else if(nmbrOfAnswers==3){
      width="col-md-4";
    }

    return (
      <div id="totalContainer">
        <div className="mySmallText hideFromStart" id="theWordMeans">"{this.props.word.word}" means</div>
        <div className=" voteBoxSingle" id="voteBox">
          <div className="centeredText voteBoxText">{this.props.word.def}</div>
        </div>
        <div id="allVotes" className="hideFromStart">
          {this.props.answers.map(answer =>
            <GetRightOrWrongAnswer width={width} votes={answer.voted} def={this.props.word.def} answer={answer}/>
          )
          }
        </div>
      </div>

    );
  }
}

VoteResult.propTypes = {
  actions: PropTypes.object.isRequired,
  word: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired

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
    answers: state.answers

  };
}
function mapDispatchToProps(dispatch) {

  return {

    actions: bindActionCreators(Object.assign({}, wordAction), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VoteResult);


function GetRightOrWrongAnswer(props) {


  if (props.answer.answer == props.def) {



    return (
      <div className={props.width+ " col-xs-12"} id={"voteBox" + props.answer.answer}>

        <div className="voteBoxUnhidden">
          <div className="centeredText voteBoxText">{props.answer.answer}</div>
        </div>
        <div className="authorName">{props.answer.username}</div>
        {props.votes.map(vote =>

          <div className={"voteStamp stampMargin"+props.votes.indexOf(vote)} id={vote} >
           <div className="voteStampText">{vote}</div>
          </div>
        )
        }

      </div>);

  }
  else {
    return (
      <div className={props.width+" col-xs-12"} id={"voteBox" + props.answer.answer}>

        <div className="voteBoxUnhiddenWrongAnswer">
          <div className="centeredText voteBoxText">{props.answer.answer}</div>
        </div>
        <div className="authorName">{props.answer.username}</div>
        {props.votes.map(vote =>

          <div className={"voteStamp stampMargin"+props.votes.indexOf(vote)} id={vote} >
            <div className="voteStampText">{vote}</div>
          </div>
        )
        }
      </div>
    );
  }

}
