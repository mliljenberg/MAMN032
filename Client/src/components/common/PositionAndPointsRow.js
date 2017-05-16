import React from 'react';

class PositionAndPointsRow extends React.Component{
  render(){
    return(

        <div className="col-xs-12 mySmallText">
          <div className="col-xs-3"></div>
          <div className="col-xs-4 text-left">{this.props.position} {this.props.name}</div>
          <div className="col-xs-2 text-right">{this.props.points}p</div>
          <div className="col-xs-3"></div>
        </div>

    );
  }
}

export default PositionAndPointsRow;
