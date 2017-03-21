import * as types from './ActionTypes';
import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccsess(courses) {
  return { type: types.LOAD_COURSES_SUCCSESS, courses};

}
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccsess(courses));
    }).catch((error) => {

      throw error;
    });
  };

}
