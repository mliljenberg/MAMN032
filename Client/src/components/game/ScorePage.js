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
    const {players} = this.props;
    $("#scoreContainer").slideToggle("slow", function () {
      setTimeout(function () {
        $("#scoreContainer").slideToggle("slow", function () {
          $("#scoreBoardContainer").slideToggle("slow", function () {


          });

        });
      }, 3000);


    });


  }

  render() {
    const {players} = this.props;
    return (
      <div>
        <div id="scoreContainer" className="hideFromStart">
          <div className="myMediumLargeText">Score</div>
          <div className="col-xs-12 myMargin"></div>
          {players.map(player =>
            <div className="col-xs-12 mySmallText" key={player.value}>
              <div className="col-xs-3"></div>
              <div className="col-xs-5 text-left">{player.value}</div>
              <div className="col-xs-1 text-right">1p</div>
              <div className="col-xs-3"></div>
            </div>
          )}
        </div>
        <div id="scoreBoardContainer" className="hideFromStart">
          <div className="myMediumLargeText">ScoreBoard</div>
          <div className="col-xs-12 myMargin"></div>
          {players.map(player =>
            <div className="col-xs-12 mySmallText" key={player.value}>
              <div className="col-xs-3"></div>
              <div className="col-xs-5 text-left">{players.indexOf(player) + 1} . {player.value}</div>
              <div className="col-xs-1 text-right">1p</div>
              <div className="col-xs-3"></div>
            </div>
          )}
          <div className="col-xs-12">
            <div className="col-md-3"></div>
            <button className="myNeutralButton col-md-6 col-xs-12">Ready</button>
            <div className="col-md-3"></div>
          </div>
        </div>
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
