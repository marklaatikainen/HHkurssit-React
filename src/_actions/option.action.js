import { optionConstants } from "../_constants";
import { optionService } from "../_services";
import { snackbarActions } from "../_actions";

export const optionActions = {
  getList
};

function getList() {
  return dispatch => {
    dispatch(request());

    optionService.getList().then(
      list => dispatch(success(list)),
      error => {
        dispatch(snackbarActions.openSnackbar(error.message, "red", "white"));
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: optionConstants.LIST_REQUEST };
  }
  function success(list) {
    return { type: optionConstants.LIST_SUCCESS, list };
  }
  function failure(error) {
    return { type: optionConstants.LIST_FAILURE, error };
  }
}
