import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div></div>
        );
    }


}
ManageCoursePage.js.propTypes = {
    //myprop: PropTypes.string.isRequired

};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
