import { snackbarConstants } from "../_constants";

export const snackbarActions = {
  openSnackbar,
  closeSnackbar
};

function openSnackbar(message, bgcolor, textcolor) {
  return dispatch => {
    dispatch(open(message, bgcolor, textcolor));
  };

  function open(message, bgcolor, textcolor) {
    return {
      type: snackbarConstants.SHOW_SNACKBAR,
      message,
      bgcolor,
      textcolor
    };
  }
}

function closeSnackbar() {
  return dispatch => {
    dispatch(close());
  };

  function close() {
    return { type: snackbarConstants.HIDE_SNACKBAR };
  }
}
