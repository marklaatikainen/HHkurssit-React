import { modalConstants, courseConstants } from "../_constants";
import { modalService } from "../_services";

export const modalActions = {
  openCourseModal,
  closeCourseModal,
  openFilterModal,
  closeFilterModal,
  openTimeModal,
  closeTimeModal
};

function openCourseModal(course) {
  return dispatch => {
    dispatch(open(course));
    document.body.classList.add("no-overflow");
  };

  function open(course) {
    return { type: modalConstants.SHOW_COURSE_MODAL, course: course };
  }
}

function closeCourseModal() {
  return dispatch => {
    dispatch(close());
    document.body.classList.remove("no-overflow");
  };

  function close() {
    return { type: modalConstants.HIDE_COURSE_MODAL };
  }
}

function openFilterModal() {
  return dispatch => {
    document.body.classList.add("no-overflow");
    dispatch(open());
  };

  function open() {
    return { type: modalConstants.SHOW_FILTER_MODAL };
  }
}

function closeFilterModal(state) {
  return dispatch => {
    dispatch(request());

    document.body.classList.remove("no-overflow");
    modalService
      .filterData(state)
      .then(data => dispatch(success(data)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: modalConstants.HIDE_FILTER_MODAL };
  }
  function success(data) {
    return { type: courseConstants.SHOW_FILTERED, data };
  }
  function failure(error) {
    return { type: modalConstants.FILTER_FAILURE, error };
  }
}

function openTimeModal(time) {
  return dispatch => {
    document.body.classList.add("no-overflow");
    dispatch(open(time));
  };

  function open(time) {
    return { type: modalConstants.SHOW_TIME_MODAL, time };
  }
}

function closeTimeModal() {
  return dispatch => {
    document.body.classList.remove("no-overflow");
    dispatch(close());
  };

  function close() {
    return { type: modalConstants.HIDE_TIME_MODAL };
  }
}
