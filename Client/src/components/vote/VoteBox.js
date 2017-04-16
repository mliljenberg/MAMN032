import React from 'react';

class VoteBox extends React.Component {
  render() {
    return (
      <div className="col-md-6 col-xs-12 voteBox" id={this.props.id} >
       <text className="centeredText">HEJ</text>
      </div>
    );
  }
}

export default VoteBox;
