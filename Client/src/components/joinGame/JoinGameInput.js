import React from 'react';

class JoinGameInput extends React.Component {
  render() {
    return (
      <div className="col-xs-12">

          <div className="col-xs-0 col-md-3"></div>
          <input className="col-xs-12 col-md-6 myInput" placeholder={this.props.label}></input>
          <div className="col-xs-0 col-md-3"></div>


      </div>
    );
  }
}

export default JoinGameInput;
