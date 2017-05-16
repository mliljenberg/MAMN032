import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playerActions from '../../actions/playerAction';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import PositionAndPointsRow from '../common/PositionAndPointsRow';
import TwoButtonsOneRow from '../common/TwoButtonsOneRow';


class ResultPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      player: Object.assign({}, props.player)

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
    return (
      <div id="totalContainer" className="hideFromStart">
        <div className="mySmallText">The winner is</div>
        <br/>
        <div className="myMediumText">{players[0].username}{players[0].points}</div>
        <br/>

        {players.map(player =>
        <PositionAndPointsRow position={players.indexOf(player+1) + 2+" . "} name={players.indexOf(player +1 ).username} points={players.indexOf(player +1 ).points}/>
        )}
        <TwoButtonsOneRow color1="White" color2="Green" label1="Leave" label2="New Game" onClick1={this.linkToHome} onClick2={this.linkToNewGame}/>


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
