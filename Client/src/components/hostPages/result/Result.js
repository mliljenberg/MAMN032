import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import PositionAndPointsRow from '../../common/PositionAndPointsRow';
import TwoButtonsOneRow from '../../common/TwoButtonsOneRow';


class ResultPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player)
    };
  }

  componentDidMount() {
    $("#totalContainer").slideToggle("slow", function () {
    });
  }

  render() {
    const {players} = this.props;
    return (
      <div id="totalContainer" className="hideFromStart">
        <div className="mySmallText">The winner is</div>
        <br/>
        <div className="myMediumText">Joel 24p</div>
        <br/>

        {players.map(player =>
          <PositionAndPointsRow position={players.indexOf(player) + 2+" . "} name={player.value} points="2"/>
        )}

      </div>
    );
  }


}
ResultPage.propTypes = {
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


  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
