import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class AnswerPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.test = "";
  }


  render() {
    return (
      <div>
        <div className="myLargeText">Word</div>
        <textarea className="descriptionInput col-xs-12"></textarea>
        <button className="myJoinButton col-xs-12">Submit</button>
      </div>
    );
  }


}
AnswerPagePlayer.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(AnswerPagePlayer);
