import * as types from './ActionTypes';
import courseApi from '../api/mockCourseApi';
import authorApi from '../api/mockAuthorApi';
//import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses};

}
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors};

}
export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch((error) => {

      throw error;
    });
  };
}

  export function loadAuthors() {
    return function(dispatch) {
      return authorApi.getAllAuthors().then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      }).catch((error) => {

        throw error;
      });
    };


  }

export function saveCourse(course) {
  return function (dispatch, getState) {

    return courseApi.saveCourse(course).then(course => {
      course.id ? dispatch(updateCourseSuccess(course)) :
        dispatch(createCourseSuccess(course));
    }).catch(error => {

      throw(error);
    });
  };
}

