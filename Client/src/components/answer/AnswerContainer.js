import React from 'react';
import CenteredButton from '../common/CenteredButton';

const AnswerContainer = ({onChange,onClick,word}) => {
    return (
      <div>
        <div className="myLargeText">{word}</div>
        <div className="col-xs-12">
          <div className="col-xs-0 col-md-2"></div>
          <textarea className="writeDescriptionInput col-xs-12 col-md-8" onChange={onChange}></textarea>
          <div className="col-xs-0 col-md-2"></div>
        </div>
        <CenteredButton color="Green" label="Submit" onClick={onClick}/>
      </div>
    );
  }

export default AnswerContainer;
