import React from 'react';
import CenteredButton from '../common/CenteredButton';

const AnswerContainer = ({onClick,word}) => {
    return (
      <div>
        <div className="myMediumSmallText">You have the true description</div>
        <div className="col-xs-12 myMargin"></div>
        <div className="mySmallText myMargin">{word.def}</div>
        <div className="col-md-3"></div>
        <CenteredButton color="Green" label="Submit" onClick={onClick}/>
        <div className="col-md-3"></div>
      </div>
    );
  }


export default AnswerContainer;
