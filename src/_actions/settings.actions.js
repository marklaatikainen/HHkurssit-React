import { settingsConstants } from "../_constants";
import { settingsService } from "../_services";

export const settingsActions = {
  getSettings
};

function getSettings() {
  return dispatch => {
    dispatch(request());

    settingsService
      .getSettings()
      .then(sett => dispatch(success(sett)), error => dispatch(failure(error)));
  };

  function request() {
    return { type: settingsConstants.SETTINGS_REQUEST };
  }
  function success(settings) {
    return { type: settingsConstants.SETTINGS_SUCCESS, settings };
  }
  function failure(error) {
    return { type: settingsConstants.SETTINGS_FAILURE, error };
  }
}
