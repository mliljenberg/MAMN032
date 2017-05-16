import React from 'react';
import $ from 'jquery';

const JoinGameInput = ({name,onChange,label}) => {
    return (
      <div className="col-xs-12">
          {$("input").attr("maxlength", 6)}
          <div className="col-xs-0 col-md-3"></div>
          <input className="col-xs-12 col-md-6 myInput" name={name} placeholder={label} onChange={onChange}></input>
          <div className="col-xs-0 col-md-3"></div>


      </div>
    );
  }
JoinGameInput.propTypes = {
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired

};


export default JoinGameInput;
