import React from 'react';
import $ from 'jquery';

class AnswerPage extends React.Component{
  constructor(props, context) {
    super(props, context);

    var time = 10; /* how long the timer runs for */
    var initialOffset = '440';
    var i = 1
    var interval = setInterval(function() {
      $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
      $('h2').text(i);
      if (i == time) {
        clearInterval(interval);
      }
      i++;
    }, 1000);

  }

  componentDidMount(){
    $("#container").slideToggle("slow", function () {

    });
  }



  render(){
    return(
      <div id="container" className="hideFromStart">
        <div className="myLargeText">A Word</div>
        <div className="pie-timer">
          <div className="timer-slot"><div className="timer-l"></div></div>
          <div className="timer-r"></div>
        </div>

      </div>
    );
  }
}

export default AnswerPage;
