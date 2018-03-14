import { ownConstants } from "../_constants";

export function own(state = {}, action) {
  switch (action.type) {
    case ownConstants.OWN_REQUEST:
      return {
        loading: true
      };
    case ownConstants.OWN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case ownConstants.OWN_FAILURE:
      return {
        error: action.error
      };
    case ownConstants.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case ownConstants.DELETE_COURSE_FAILURE:
      return {
        error: action.error
      };
    case ownConstants.RESTORE_DEFAULTS_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case ownConstants.RESTORE_DEFAULTS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
