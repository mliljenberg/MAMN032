import React from 'react';
import CenteredButton from '../common/CenteredButton';

class AnswerContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="myMediumSmallText">You have the true description</div>
        <div className="col-xs-12 myMargin"></div>
        <div className="mySmallText myMargin">A word means blablablabla A word means blablablabla</div>
        <div className="col-md-3"></div>
        <button className="myNeutralButton col-xs-12 col-md-6">Submit</button>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default AnswerContainer;
