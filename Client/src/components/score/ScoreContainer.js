import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playerActions from '../../actions/playerAction';
import PositionAndPointsRow from '../common/PositionAndPointsRow';


class ScoreContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player)
    };
  }

  render(){
    const {players} = this.props;
    return(
      <div>
        <div className="myMediumLargeText">Score</div>
        <div className="col-xs-12 myMargin"></div>
        {players.map(player =>
         <PositionAndPointsRow position="" name={player.value} points="1"/>
        )}
      </div>
    );
  }
}
ScoreContainer.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(ScoreContainer);
