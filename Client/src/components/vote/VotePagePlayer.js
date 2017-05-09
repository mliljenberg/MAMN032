import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import VoteBox from './VoteBox';

class VotePagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this);
    $(document).on('click', 'div', function (e) {

      if (e.target.id.startsWith("voteBox")) {

        $("#voteContainer").slideToggle("slow", function () {
          browserHistory.push("score");
        });

      }
    });
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
            $("#listOfAnswers").append($("<div/>", {
              class: voteWidth+ ' voteBox',
              id: 'voteBox' + i,
              cursor: 'pointer',
              display: 'none'
            }).append($("<text/>", {class: 'centeredText voteBoxText', text: "HEJ Hej Hej HEJ Hej Hej HEJ Hej Hej HEJ Hej Hej"})));
            $("#voteBox" + i).slideToggle("slow", function () {

            });
          }, i * 3000);

        }
      }, 1000);
    });


  }


  render() {

    return (
      <div>
        <div id="voteContainer" className="hideFromStart">

          <div className="mySmallText">"The word" means</div>
          <div id="listOfAnswers" className="col-xs-12">


          </div>

        </div>
        <div id="waitContainer" className="hideFromStart">
          WAITING
        </div>
      </div>

    );
  }


}
VotePagePlayer.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(VotePagePlayer);
