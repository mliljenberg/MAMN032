import React from 'react';
import CenteredButton from '../common/CenteredButton';

class AnswerContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="myLargeText">Word</div>
        <div className="col-xs-12">
          <div className="col-xs-0 col-md-2"></div>
          <textarea className="descriptionInput col-xs-12 col-md-8"></textarea>
          <div className="col-xs-0 col-md-2"></div>
        </div>
        <CenteredButton color="Green" label="Submit" onClick={this.props.onClick}/>
      </div>
    );
  }
}

export default AnswerContainer;
