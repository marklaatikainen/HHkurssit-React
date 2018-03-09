// import { history } from "../_helpers";
import { courseConstants } from "../_constants";
import { courseService } from "../_services";

export const courseActions = {
  getSettings,
  getProgramList,
  getAllCourses,
  setDataToTable,
  getOwnCourses,
  updateCourse,
  restoreDefaults
};

function getSettings() {
  return dispatch => {
    dispatch(request());

    courseService
      .getSettings()
      .then(sett => dispatch(success(sett)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: courseConstants.SETTINGS_REQUEST };
  }
  function success(settings) {
    return { type: courseConstants.SETTINGS_SUCCESS, settings };
  }
  function failure(error) {
    return { type: courseConstants.SETTINGS_FAILURE, error };
  }
}

function getProgramList() {
  return dispatch => {
    dispatch(request());

    courseService
      .getProgramList()
      .then(list => dispatch(success(list)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: courseConstants.PROGRAM_LIST_REQUEST };
  }
  function success(list) {
    return { type: courseConstants.PROGRAM_LIST_SUCCESS, list };
  }
  function failure(error) {
    return { type: courseConstants.PROGRAM_LIST_FAILURE, error };
  }
}

function getAllCourses() {
  return dispatch => {
    dispatch(request());

    courseService
      .getAllCourses()
      .then(data => dispatch(success(data)), error => dispatch(failure(error)));
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

function updateCourse(course) {
  return dispatch => {
    courseService
      .updateCourse(course)
      .then(data => dispatch(success()), error => dispatch(failure(error)));
  };

  function success() {
    return { type: courseConstants.UPDATE_COURSE_SUCCESS };
  }
  function failure(error) {
    return { type: courseConstants.UPDATE_COURSE_FAILURE, error };
  }
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
    courseService
      .restoreDefaults()
      .then(data => dispatch(success()), error => dispatch(failure(error)));
  };

  function success() {
    return { type: courseConstants.RESTORE_DEFAULTS_SUCCESS };
  }
  function failure(error) {
    return { type: courseConstants.RESTORE_DEFAULTS_FAILURE, error };
  }
}
