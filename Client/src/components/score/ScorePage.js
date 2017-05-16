import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playerActions from '../../actions/playerAction';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import * as myselfActions from '../../actions/myselfAction';


class ScorePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player)
    };
  }

  componentDidMount() {
    const {players} = this.props;
    $("#container").slideToggle("slow", function () {


    });


  }


//Detectade ingen förändring..
  render() {
    return (
      <div>
        <div id="container" className="hideFromStart">
          <div className="myMediumText">Well done!</div><br/>
          <div className="mySmallText">The result is displayed at the screen</div>
        </div>
      </div>
    );
  }


}
ScorePage.propTypes = {

  myself: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    myself: state.myself
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, myselfActions), dispatch)

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ScorePage);
