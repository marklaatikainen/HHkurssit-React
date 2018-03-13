// import { history } from "../_helpers";
import { courseConstants } from "../_constants";
import { courseService } from "../_services";
import { snackbarActions } from "../_actions";

export const courseActions = {
  getAllCourses,
  setDataToTable,
  getOwnCourses,
  addCourse,
  deleteCourse,
  restoreDefaults
};

function getAllCourses() {
  return dispatch => {
    dispatch(request());

    courseService.getAllCourses().then(
      data => dispatch(success(data)),
      error => {
        dispatch(failure(error));
        dispatch(snackbarActions.openSnackbar(error.message, "red", "white"));
      }
    );
  };

  function request() {
    return { type: courseConstants.ALL_REQUEST };
  }
  function success(data) {
    return { type: courseConstants.ALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: courseConstants.ALL_FAILURE, error };
  }
}

function setDataToTable() {
  return dispatch => {
    dispatch(setData());
  };

  function setData() {
    return { type: courseConstants.SET_TABLE_DATA };
  }
}

function addCourse(course) {
  return dispatch => {
    courseService.addCourse(course).then(
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
    return { type: courseConstants.ADD_COURSE_FAILURE, error };
  }
}

function deleteCourse(course) {
  return dispatch => {
    courseService.deleteCourse(course).then(
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

function getOwnCourses() {
  return dispatch => {
    dispatch(request());

    courseService
      .getOwnCourses()
      .then(data => dispatch(success(data)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: courseConstants.OWN_REQUEST };
  }
  function success(data) {
    return { type: courseConstants.OWN_SUCCESS, data };
  }
  function failure(error) {
    return { type: courseConstants.OWN_FAILURE, error };
  }
}

function restoreDefaults() {
  return dispatch => {
    courseService.restoreDefaults().then(
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
