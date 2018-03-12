import { optionConstants } from "../_constants";

export function option(state = {}, action) {
  switch (action.type) {
    case optionConstants.LIST_REQUEST:
      return {
        loading: true
      };
    case optionConstants.LIST_SUCCESS:
      return {
        list: action.list
      };
    case optionConstants.LIST_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
