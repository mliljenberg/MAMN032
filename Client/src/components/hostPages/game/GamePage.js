import React from 'react';
import PlayersContainer from '../../game/PlayersContainer';
import $ from 'jquery';

class GamePage extends React.Component{


  componentDidMount(){
    $("#playersContainer").slideToggle("slow", function () {

    });
  }

  render(){


    return(

      <div>
        <div id="playersContainer" className="hideFromStart">
          <PlayersContainer button="false" room="1234"/>

        </div>
      </div>
    );
  }
}

export default GamePage;
