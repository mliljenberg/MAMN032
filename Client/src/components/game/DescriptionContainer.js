import React from 'react';
import Description from './Description';
import CenteredButton from '../common/CenteredButton';

class DescriptionContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="col-xs-12">
          <div className="col-xs-0 col-md-1"></div>
          <div className="description col-xs-12 col-md-10">
            <div className="col-xs-1"></div>
            <div className="col-xs-10 descriptionInput">


              {Description[0].description}<br/><br/>
              {Description[1].description}<br/><br/>
              {Description[2].description}<br/><br/>
              {Description[3].description}<br/>
              {Description[4].description}<br/><br/>

            </div>
            <div className="col-xs-1"></div>
          </div>

          <div className="col-xs-0 col-md-1"></div>
        </div>
        <CenteredButton color="White" label="OK" onClick={this.props.onClick}/>
      </div>
    );
  }
}

export default DescriptionContainer;
