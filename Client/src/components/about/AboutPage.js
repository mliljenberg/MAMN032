/**
 * Created by mliljenberg on 2017-01-25.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class AboutPage extends React.Component {
  constructor(props,context){
    super(props,context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage(){
    browserHistory.push('/course');
}


 render () {
    const {courses} = this.props;
    return(
      <div>
       <h1>AboutPage</h1>
        <p>Some about us stuff, currently used as a example of how we should use redu</p>
        <button className="btn btn-success" onClick={this.redirectToAddCoursePage}>Add Course</button>
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
