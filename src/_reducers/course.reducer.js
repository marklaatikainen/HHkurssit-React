import { courseConstants } from "../_constants";

export function course(state = {}, action) {
  switch (action.type) {
    case courseConstants.PROGRAM_LIST_REQUEST:
      return {
        loading: true
      };
    case courseConstants.PROGRAM_LIST_SUCCESS:
      return {
        list: action.list
      };
    case courseConstants.PROGRAM_LIST_FAILURE:
      return {
        error: action.error
      };
    case courseConstants.ALL_REQUEST:
      return {
        loading: true
      };
    case courseConstants.ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case courseConstants.ALL_FAILURE:
      return {
        error: action.error
      };
    case courseConstants.OWN_REQUEST:
      return {
        loading: true
      };
    case courseConstants.OWN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case courseConstants.OWN_FAILURE:
      return {
        error: action.error
      };
    case courseConstants.SHOW_FILTERED:
      return {
        loading: false,
        data: action.data
      };
    case courseConstants.SET_TABLE_DATA:
      return {
        data: action.data
      };
    case courseConstants.SET_FILTER_TEXT:
      return {
        filter: action.text
      };
    case courseConstants.ADD_COURSE_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case courseConstants.ADD_COURSE_FAILURE:
      return {
        error: action.error
      };
    case courseConstants.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case courseConstants.DELETE_COURSE_FAILURE:
      return {
        error: action.error
      };
    case courseConstants.RESTORE_DEFAULTS_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case courseConstants.RESTORE_DEFAULTS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
