import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as myselfAction from '../../actions/myselfAction';
import CenteredButton from '../common/CenteredButton';

class PlayersContainer extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.render = this.render.bind(this);
  }

  render(){
    const {players} = this.props;
    let leftOverRow1 = "";
    let leftOverClass = "horizontalListItem center-block col-xs-4"
    let button="";
    let key="";

    let numberOfPlayers =4;

    var nameWidth="";
    switch(numberOfPlayers) {
      case 1:
        nameWidth = "col-xs-12";
        break;
      case 2:
        nameWidth = "col-xs-6"
        break;
      case 3:
        nameWidth = "col-xs-4"
        break;
      case 4:
        nameWidth = "col-xs-6"
        break;
      default:
    }




    if(this.props.button ==="true"){
      button= <div className="col-xs-12 myMargin"><CenteredButton onClick={this.props.onClick} color="White" label="Leave"/></div>;
    }



    return(
      <div>
        <div className="myMediumLargeText">Room: {this.props.room}</div>
        <div className="col-xs-12">
          <div className="col-xs-0 col-md-2"></div>
          {key}
          <div className="horizontalList col-xs-12 col-md-8">
            {players.map(player =>

                <div className={nameWidth + "mySmallText"}> {player.value}</div>
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
  players: PropTypes.array.isRequired

};

function mapStateToProps(state, ownProps) {

  return {

    myself: state.myself,
    players: state.players

  };
}
function mapDispatchToProps(dispatch) {
  return {

    actions: bindActionCreators(Object.assign({}, myselfAction), dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);