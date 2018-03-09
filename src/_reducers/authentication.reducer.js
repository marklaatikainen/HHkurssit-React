import { userConstants } from "../_constants";
import { userActions } from "../_actions";

let user = userActions.getProfile().sub;
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
