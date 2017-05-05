import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import {browserHistory}  from 'react-router';
import ScoreContainer from '../../score/ScoreContainer';
import ScoreBoardContainer from '../../score/ScoreBoardContainer';


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

  clickedReady(){
    $("#scoreBoardContainer").slideToggle("slow", function () {
      browserHistory.push('/answer');
    });

  }
//Detectade ingen förändring..
  render() {
    const {players} = this.props;
    return (
      <div>
        <div id="scoreContainer" className="hideFromStart">
          <ScoreContainer/>
        </div>
        <div id="scoreBoardContainer" className="hideFromStart">
          <ScoreBoardContainer show="no" onClick={this.clickedReady}/>
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


  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ScorePage);