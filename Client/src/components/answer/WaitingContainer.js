import React from 'react';

class WaitingContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="myMediumText">Waiting on other players</div>
        <br/>
        <div className="mySmallText">{this.props.ready}/4 submitted</div>
      </div>
    );
  }
}

export default WaitingContainer;
