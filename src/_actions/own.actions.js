import { ownConstants } from "../_constants";
import { ownService } from "../_services";
import { snackbarActions } from "../_actions";

export const ownActions = {
  getOwnCourses,
  addCourse,
  deleteCourse,
  restoreDefaults
};

function addCourse(course) {
    return dispatch => {
      ownService.addCourse(course).then(
        data => {
          dispatch(getOwnCourses());
          dispatch(snackbarActions.openSnackbar(data, "green", "white"));
        },
        error => {
          dispatch(failure(error));
          dispatch(getOwnCourses());
          dispatch(snackbarActions.openSnackbar(error, "red", "white"));
        }
      );
    };
  
    function failure(error) {
      return { type: ownConstants.ADD_COURSE_FAILURE, error };
    }
  }
  
  function deleteCourse(course) {
    return dispatch => {
      ownService.deleteCourse(course).then(
        data => {
          dispatch(getOwnCourses());
          dispatch(snackbarActions.openSnackbar(data, "green", "white"));
        },
        error => {
        //   dispatch(getOwnCourses());
          dispatch(snackbarActions.openSnackbar(error, "red", "white"));
        }
      );
    };
  }
  
  function getOwnCourses() {
    return dispatch => {
      dispatch(request());
  
      ownService
        .getOwnCourses()
        .then(data => dispatch(success(data)), error => dispatch(failure(error)));
    };
  
    function request() {
      return { type: ownConstants.OWN_REQUEST };
    }
    function success(data) {
      return { type: ownConstants.OWN_SUCCESS, data };
    }
    function failure(error) {
      return { type: ownConstants.OWN_FAILURE, error };
    }
  }
  
  function restoreDefaults() {
    return dispatch => {
      ownService.restoreDefaults().then(
        data => {
          dispatch(getOwnCourses());
          dispatch(snackbarActions.openSnackbar(data, "green", "white"));
        },
        error => {
          // dispatch(getOwnCourses());
          dispatch(snackbarActions.openSnackbar(error, "red", "white"));
        }
      );
    };
  }
  