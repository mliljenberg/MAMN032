import * as types from './ActionTypes';
import courseApi from '../api/mockCourseApi';
import authorApi from '../api/mockAuthorApi';
//import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccsess(courses) {
  return { type: types.LOAD_COURSES_SUCCSESS, courses};

}
export function loadAuthorsSuccsess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCSESS, authors};

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
      dispatch(loadCoursesSuccsess(courses));
    }).catch((error) => {

      throw error;
    });
  };
}

  export function loadAuthors() {
    return function(dispatch) {
      return authorApi.getAllAuthors().then(authors => {
        dispatch(loadAuthorsSuccsess(authors));
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

