import { timeConstants } from "../_constants";

export function time(state = {}, action) {
  switch (action.type) {
    case timeConstants.OWN_TIME_REQUEST:
      return {
        loading: true
      };
    case timeConstants.OWN_TIME_SUCCESS:
      return {
        loading: false,
        time: action.time
      };
    case timeConstants.OWN_TIME_FAILURE:
      return {
        error: action.error
      };
    case timeConstants.COURSE_TIME_REQUEST:
      return {
        loading: true
      };
    case timeConstants.COURSE_TIME_SUCCESS:
      return {
        loading: false,
        time: action.time
      };
    case timeConstants.COURSE_TIME_FAILURE:
      return {
        error: action.error
      };
    case timeConstants.GROUP_TIME_REQUEST:
      return {
        loading: true
      };
    case timeConstants.GROUP_TIME_SUCCESS:
      return {
        loading: false,
        time: action.time
      };
    case timeConstants.GROUP_TIME_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
