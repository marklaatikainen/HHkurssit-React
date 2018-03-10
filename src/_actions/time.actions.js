import { timeConstants } from "../_constants";
import { timeService } from "../_services";
import { snackbarActions, modalActions } from "../_actions";

export const timeActions = {
  getOwnTime,
  getCourseTime,
  getGroupTime
};

function getOwnTime(period) {
  return dispatch => {
    dispatch(request());

    timeService.getOwnTime(period).then(
      time => {
        dispatch(success(time));
        dispatch(modalActions.openTimeModal(time));
      },
      error => {
        dispatch(failure(error));
        dispatch(snackbarActions.openSnackbar(error, "red", "white"));
      }
    );
  };

  function request() {
    return { type: timeConstants.OWN_TIME_REQUEST };
  }
  function success(time) {
    return { type: timeConstants.OWN_TIME_SUCCESS, time };
  }
  function failure(error) {
    return { type: timeConstants.OWN_TIME_FAILURE, error };
  }
}

function getCourseTime(courseid, period) {
  return dispatch => {
    dispatch(request());

    timeService.getCourseTime(courseid, period).then(
      time => {
        dispatch(success(time));
        dispatch(modalActions.openTimeModal(time));
      },
      error => {
        dispatch(failure(error));
        dispatch(snackbarActions.openSnackbar(error, "red", "white"));
      }
    );
  };

  function request() {
    return { type: timeConstants.COURSE_TIME_REQUEST };
  }
  function success(time) {
    return { type: timeConstants.COURSE_TIME_SUCCESS, time };
  }
  function failure(error) {
    return { type: timeConstants.COURSE_TIME_FAILURE, error };
  }
}

function getGroupTime(groupid, period) {
  return dispatch => {
    dispatch(request());

    timeService.getGroupTime(groupid, period).then(
      time => {
        dispatch(success(time));
        dispatch(modalActions.openTimeModal(time));
      },
      error => {
        dispatch(snackbarActions.openSnackbar(error, "red", "white"));
      }
    );
  };

  function request() {
    return { type: timeConstants.GROUP_TIME_REQUEST };
  }
  function success(time) {
    return { type: timeConstants.GROUP_TIME_SUCCESS, time };
  }
}
