import decode from "jwt-decode";

import { userConstants } from "../_constants";
import { userService } from "../_services";
import { snackbarActions } from "../_actions";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  updateProfile,
  loggedIn,
  getProfile,
  getUserInfo
};

function loggedIn() {
  // Checks if there is a saved token and it's still valid
  const token = getToken(); // Getting token from localstorage
  return !!token && !isTokenExpired(token);
}

function getProfile() {
  // Using jwt-decode npm package to decode the token
  try {
    return decode(getToken());
  } catch (error) {
    isTokenExpired();
    return { sub: error };
  }
}

function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem("authorization_token");
}

function isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      localStorage.removeItem("authorization_token");
      return true;
    }
    return false;
  } catch (err) {
    history.push("/login");
    return false;
  }
}

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure("Kirjautuminen epäonnistui"));
        dispatch(
          snackbarActions.openSnackbar(
            "Kirjautuminen epäonnistui",
            "red",
            "white"
          )
        );
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      res => {
        dispatch(success());
        history.push("/login");
        dispatch(snackbarActions.openSnackbar(res, "green", "white"));
      },
      error => {
        dispatch(failure(error));
        dispatch(snackbarActions.openSnackbar(error, "red", "white"));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function updateProfile(user) {
  return dispatch => {
    dispatch(request(user));

    userService.updateProfile(user).then(
      res => {
        dispatch(success());
        dispatch(snackbarActions.openSnackbar(res, "green", "white"));
      },
      error => {
        dispatch(failure(error));
        dispatch(snackbarActions.openSnackbar(error, "red", "white"));
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}

function getUserInfo() {
  return dispatch => {
    dispatch(request());

    userService.getUserInfo().then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
        dispatch(snackbarActions.openSnackbar(error, "red", "white"));
      }
    );
  };

  function request() {
    return { type: userConstants.USERINFO_REQUEST };
  }
  function success(user) {
    return { type: userConstants.USERINFO_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.USERINFO_FAILURE, error };
  }
}
