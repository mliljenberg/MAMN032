import React from 'react';
import CenteredButton from '../common/CenteredButton';


const RightAnswerContainer = ({onClick, def}) => {
  return (
    <div>
      <div className="myMediumSmallText">You have the true description</div>
      <div className="col-xs-12 myMargin">
      </div>
      <div className="mySmallText myMargin">{def}</div>

    </div>
  );
}

export default RightAnswerContainer;

