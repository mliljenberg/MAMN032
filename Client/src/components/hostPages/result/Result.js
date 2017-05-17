import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import PositionAndPointsRow from '../../common/PositionAndPointsRow';
import TwoButtonsOneRow from '../../common/TwoButtonsOneRow';
import * as playerActions from '../../../actions/playerAction';

class ResultPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player),

    };


    this.props.players.sort(function(a,b){
      return a.points - b.points;
    });

    console.log(this.props.players);
  }

  linkToHome(){
    $("#totalContainer").slideToggle("slow", function () {
      browserHistory.push('/joinGame');
    });
  }

  linkToNewGame(){
    $("#totalContainer").slideToggle("slow", function () {
      browserHistory.push('/game');
    });
  }

  componentDidMount() {
    $("#totalContainer").slideToggle("slow", function () {
    });
  }

  render() {
    const {players} = this.props;
    let first = true;

    return (
      <div id="totalContainer" className="hideFromStart">
        <div className="mySmallText">The winner is</div>
        <br/>
        <div className="myMediumLargeText">{players[players.length-1].username} {players[players.length-1].points}p</div>
        <br/>
        <PositionAndPointsRow position={"2. "} name={players[players.length-2].username} points={players[players.length-2].points+ " "}/>
        <PositionAndPointsRow position={"3. "} name={players[players.length-3].username} points={players[players.length-3].points+ " "}/>
        <PositionAndPointsRow position={"4. "} name={players[players.length-4].username} points={players[players.length-4].points+ " "}/>


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
    actions: bindActionCreators(Object.assign({}, playerActions), dispatch)

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
