import React from 'react';

class TwoButtonsOneRow extends React.Component{
  render(){
    return(
      <div className="col-xs-12">

        <div className="col-md-2 col-xs-0"></div>

        <button className={"my"+this.props.color1+"Button col-md-3 col-xs-12 "} onClick={this.props.onClick1}>{this.props.label1}</button>
        <div className="col-md-2"></div>
        <button className={"my"+this.props.color2+"Button col-md-3 col-xs-12 "} onClick={this.props.onClick2}>{this.props.label2}</button>
        <div className="col-md-2 col-xs-0"></div>
      </div>
    );
  }
}

export default TwoButtonsOneRow;
