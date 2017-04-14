import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playerActions from '../../actions/playerAction';
import $ from 'jquery';


class ScorePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player)
    };
  }

  componentDidMount() {
    $("#scoreContainer").slideToggle("slow", function () {

    });


  }

  render() {
    const {players} = this.props;
    return (
      <div id="scoreContainer" className="hideFromStart">
        <div className="myMediumLargeText">Score</div>
        <div className="col-xs-12 myMargin"></div>
          {players.map(player =>
            <div className="col-xs-12 mySmallText">
              <div className="col-xs-3"></div>
              <div className="col-xs-3 text-left">{player.value}</div>
              <div className="col-xs-3 text-right">1p</div>
              <div className="col-xs-3"></div>
            </div>
          )}


      </div>
    );
  }


}
ScorePage.propTypes = {
  players: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  const player = {id: '', value: ''};
  return {
    players: state.players,
    player: player
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, playerActions), dispatch)

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ScorePage);
