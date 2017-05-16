import React from 'react';

const WaitingContainer = ({ready}) => {

   return (
      <div>
        <div className="myMediumText">Waiting on other players</div>
        <br/>
        <div className="mySmallText">{ready}/4 submitted</div>
      </div>
    );
  }


export default WaitingContainer;
