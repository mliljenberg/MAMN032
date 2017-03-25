import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Mall extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.test = "";
    }
  handleClick(){
    $('#test').text("hej hej hej");
  }



  render() {
        return (
            <div>
              <div className="btn btn-primary" onClick={this.handleClick}>Click me</div>
              <div id="test">{this.test}</div>
            </div>
        );
    }


}
Mall.propTypes = {
    //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
    return {
       // dina props : state.dina props
    };
}
function mapDispatchToProps(dispatch) {
    return {
      //här bindar du alla dina actiones tror inte du behöver ändra den
      //  actions: bindActionCreators(actions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Mall);
