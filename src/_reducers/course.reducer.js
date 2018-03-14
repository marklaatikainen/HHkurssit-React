import { courseConstants } from "../_constants";

export function course(state = {}, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
