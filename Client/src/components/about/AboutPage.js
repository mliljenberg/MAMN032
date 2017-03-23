/**
 * Created by mliljenberg on 2017-01-25.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';

class AboutPage extends React.Component {
  constructor(props,context){
    super(props,context);
  }



 render () {
    const {courses} = this.props;
    return(
      <div>
       <h1>AboutPage</h1>
        <p>Some about us stuff, currently used as a example of how we should use redux</p>
        <CourseList courses={courses}/>
      </div>
    );
 }


}
AboutPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired

};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}
 function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions,dispatch)
  };
 }



export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
