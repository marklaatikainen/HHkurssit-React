import { filterConstants } from "../_constants";

export function filter(state = {}, action) {
  switch (action.type) {
    case filterConstants.SET_FILTER_TEXT:
      return {
        text: action.text
      };
    default:
      return state;
  }
}
