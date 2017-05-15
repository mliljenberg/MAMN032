import React from 'react';
import CenteredButton from '../common/CenteredButton';


const RightAnswerContainer = ({onClick, def}) => {
  return (
    <div>
      <div className="myMediumSmallText">You have the true description</div>
      <div className="col-xs-12 myMargin">
      </div>
      <div className="mySmallText myMargin">{def}</div>
      <div className="col-md-3"></div>
      <CenteredButton color="Green" label="Ready" onClick={onClick}/>
      <div className="col-md-3"></div>
    </div>
  );
}

export default RightAnswerContainer;

