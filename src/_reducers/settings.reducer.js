import { settingsConstants } from "../_constants";

export function settings(state = {}, action) {
  switch (action.type) {
    case settingsConstants.SETTINGS_REQUEST:
      return {
        loading: true
      };
    case settingsConstants.SETTINGS_SUCCESS:
      return {
        settings: action.settings
      };
    case settingsConstants.SETTINGS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
