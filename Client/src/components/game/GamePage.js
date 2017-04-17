import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import io from 'socket.io-client';
const socket = io.connect();
import $ from 'jquery';
import * as myselfAction from '../../actions/myselfAction';
import {Link, IndexLink, browserHistory} from 'react-router';

import Description from './Description';


class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { leftOver: 0};
    socket.emit('join room', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
    console.log("Trying to join room/client");
    this.render = this.render.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    socket.on('new message', function () {
      $('#list').append('<li> Tryckte på knappen </li>');
    });


  }

  buttonClicked() {
    socket.emit('send message', window.location.href.substr(window.location.href.lastIndexOf('/') + 1));

  }

  startAnimation() {


    $("#descriptionContainer").slideToggle("slow", function () {
      $("#playersContainer").slideToggle("slow", function () {
        setTimeout(function () {
          $("#playersContainer").slideToggle("slow", function () {
              browserHistory.push("/answer");
          });
        }, 3000);
      });


    });
  }



  componentDidMount(){
    $("#descriptionContainer").slideToggle("slow", function () {

    });
  }

  render() {
    const {players} = this.props;
    let leftOverRow1 = "";
    let leftOverClass = "horizontalListItem center-block col-xs-4"


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


      return (
        <div>
          <div id="descriptionContainer" className="hideFromStart">

            <div className="col-xs-12">
              <div className="col-xs-0 col-md-1"></div>
              <div className="description col-xs-12 col-md-10">
                <div className="col-xs-1"></div>
                <div className="col-xs-10">
                  <div className="myMargin"></div>

                  {Description[0].description}<br/><br/>
                  {Description[1].description}<br/><br/>
                  {Description[2].description}
                </div>
                <div className="col-xs-1"></div>
              </div>

              <div className="col-xs-0 col-md-1"></div>
            </div>
            <div className="col-xs-0 col-md-3"></div>
            <button className="myNeutralButton col-xs-12 col-md-6" onClick={this.startAnimation}>OK</button>
            <div className="col-xs-0 col-md-3"></div>
          </div>

          <div id="playersContainer" className="hideFromStart">

            <div className="myMediumLargeText">Room: 1234</div>
            <div className="col-xs-12">
              <div className="col-xs-0 col-md-2"></div>
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

            <div className="col-xs-12 myMargin">
              <div className="col-md-3 col-xs-0"></div>

              <Link to="/game">
                <button className="myNeutralButton col-md-6 col-xs-12">Leave</button>
              </Link>
              <div className="col-md-3 col-xs-0"></div>
            </div>
          </div>
        </div>
      );
    }




}


GamePage.propTypes = {


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


export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
