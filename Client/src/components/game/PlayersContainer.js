import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as myselfAction from '../../actions/myselfAction';
import CenteredButton from '../common/CenteredButton';
import * as roomActions from '../../actions/roomAction';
import * as playerActions from '../../actions/playerAction';

class PlayersContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = { leftOver: 0};
    this.render = this.render.bind(this);
  }

  render(){
    const {players} = this.props;
    let leftOverRow1 = "";
    let leftOverClass = "horizontalListItem center-block col-xs-4"
    let button="";
    let key="";


    this.state.leftOver = players.length % 3;
    if (this.state.leftOver === 0) {
      leftOverRow1 = <div className="col-xs-0"></div>;

    }
    if (this.state.leftOver === 1) {
      leftOverRow1 = <div className="col-xs-0"></div>;
      leftOverClass = "horizontalListItem myMargin center-block col-xs-3"

    }
    if (this.state.leftOver === 2) {
      leftOverRow1 = <div className="col-xs-2"></div>;

    }

    if(this.props.button ==="true"){
      button= <div className="col-xs-12 myMargin"><CenteredButton onClick={this.props.onClick} color="White" label="Leave"/></div>;
    }



    return(
      <div>
        <div className="myMediumLargeText">Room: {this.props.room.id}</div>
        <div className="col-xs-12">
          <div className="col-xs-0 col-md-2"></div>
          {key}
          <div className="horizontalList col-xs-12 col-md-8">
            {leftOverRow1}
            {players.map(player =>
              <div className={leftOverClass} key={player.value}>

                <div className="mySmallText"> {player.value}</div>

              </div>
            )}

          </div>
          <div className="col-xs-0 col-md-2"></div>
        </div>
        {button}

      </div>
    );
  }
}

PlayersContainer.propTypes = {


  myself: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  room: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {

  return {

    myself: state.myself,
    players: state.players,
    room: state.room

  };
}
function mapDispatchToProps(dispatch) {
  return {

    actions: bindActionCreators(Object.assign({}, myselfAction, roomActions, playerActions), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);
