import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import $ from 'jquery';


class VotedPagePlayer extends React.Component {
  constructor(props, context) {
    super(props, context);


  }


  componentDidMount() {
    $("#Container").slideToggle("slow", function () {

    });

  }





  render() {
    return (
      <div id="Container" className="hideFromStart">
        <div className="myMediumText">Waiting on other players</div><br/>
      </div>
    );
  }
}
export default VotedPagePlayer;
