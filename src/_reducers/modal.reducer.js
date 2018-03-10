import { modalConstants } from "../_constants";

export function modal(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case modalConstants.SHOW_COURSE_MODAL:
      return {
        course_open: true,
        course: action.course
      };
    case modalConstants.HIDE_COURSE_MODAL:
      return {
        course_open: false
      };
    case modalConstants.SHOW_FILTER_MODAL:
      return {
        filter_open: true
      };
    case modalConstants.HIDE_FILTER_MODAL:
      return {
        filter_open: false
      };
    case modalConstants.FILTER_SUCCESS:
      return {
        filter_open: false,
        filtered_data: action.data
      };
    case modalConstants.FILTER_FAILURE:
      return {
        filter_open: false,
        error: action.error
      };
    case modalConstants.SHOW_TIME_MODAL:
      return {
        time_open: true,
        time: action.time
      };
    case modalConstants.HIDE_TIME_MODAL:
      return {
        time_open: false
      };
    default:
      return state;
  }
}
