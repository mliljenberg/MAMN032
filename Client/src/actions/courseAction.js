import * as types from './ActionTypes';
import courseApi from '../api/mockCourseApi';
import authorApi from '../api/mockAuthorApi';

export function loadCoursesSuccsess(courses) {
  return { type: types.LOAD_COURSES_SUCCSESS, courses};

}
export function loadAuthorsSuccsess(courses) {
  return { type: types.LOAD_AUTHORS_SUCCSESS, courses};

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
      return authorApi.getAllAuthors().then(courses => {
        dispatch(loadAuthorsSuccsess(courses));
      }).catch((error) => {

        throw error;
      });
    };


  }
