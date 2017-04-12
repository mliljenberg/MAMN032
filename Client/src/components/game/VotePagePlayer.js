import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';

class VotePagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  componentDidMount() {
    $("#totalContainer").slideToggle("slow", function () {
      setTimeout(function () {
        for (let i = 0; i < 4; i++) {
          setTimeout(function () {
            $("#listOfAnswers").append($("<div/>", {class:'col-md-6 col-xs-12'}).append($("<div/>", {class:'col-md-0'}),$("<div/>", {class:'col-md-12 col-xs-12 voteBox', id:'voteBox'+i, display:'none'}).append($("<text/>", {class: 'centeredText', text: "HEJ"})), $("<div/>", {class:'col-md-0'})));
            $("#voteBox"+i).slideToggle("slow", function () {

            });
          }, i * 3000);

        }
      }, 1000);
    });


  }


  render() {

    return (
      <div id="totalContainer" className="hideFromStart">

        <div className="mySmallText">"The word" means</div>
        <div id="listOfAnswers" className="col-xs-12">


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
