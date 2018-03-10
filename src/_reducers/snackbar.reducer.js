import { snackbarConstants } from "../_constants";

export function snackbar(state = {}, action) {
  switch (action.type) {
    case snackbarConstants.SHOW_SNACKBAR:
      return {
        open: true,
        message: action.message,
        duration: 4000,
        type: action.bgcolor,
        color: action.textcolor 
      };
    case snackbarConstants.HIDE_SNACKBAR:
      return {
        open: false,
        message: "",
        duration: 0
      };
    default:
      return state;
  }
}
