import React from 'react';

class CenteredButton extends React.Component{
  render(){
    return(
      <div className="col-xs-12">

        <div className="col-md-3 col-xs-0"></div>

        <button className={"my"+this.props.color+"Button col-md-6 col-xs-12 "} onClick={this.props.onClick}>{this.props.label}</button>

        <div className="col-md-3 col-xs-0"></div>
      </div>
    );
  }
}

export default CenteredButton;
