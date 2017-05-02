import React from 'react';
import PlayersContainer from '../../game/PlayersContainer';
import $ from 'jquery';

class GamePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    $(document).ready(function () {
      var audio = $("#clickSound")[0];


      audio.play();

    });
  }


  componentDidMount() {
    $("#playersContainer").slideToggle("slow", function () {

    });
  }


  render() {


    return (

      <div>
        <div id="playersContainer" className="hideFromStart">
          <PlayersContainer button="false" room="1234"/>


        </div>
      </div>
    );
  }
}

export default GamePage;
