import { courseConstants } from "../_constants";
import { courseService } from "../_services";
import { snackbarActions } from "../_actions";

export const courseActions = {
  getAllCourses,
  setDataToTable
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
