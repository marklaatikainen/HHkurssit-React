import axios from "axios";
import decode from "jwt-decode";

export const userService = {
  login,
  logout,
  register,
  getProfile,
  getToken
};

const apiBaseUrl = "https://hhkurssit.markl.fi/";

function logout() {
  localStorage.removeItem("authorization_token");
}

function getProfile() {
  // Using jwt-decode npm package to decode the token
  return decode(getToken());
}

function setToken(authorization_Token) {
  // Saves user token to localStorage
  localStorage.setItem("authorization_token", authorization_Token);
  window.location.replace("/");
}

function getToken() {
  // Retrieves the user token from localStorage
  return localStorage.getItem("authorization_token");
}

function login(username, password) {
  const creds = {
    username: username.trim(),
    password: password.trim()
  };

  return axios.post(apiBaseUrl + "login", creds).then(response => {
    if (response.status !== 200) {
      return Promise.reject(response.statusText);
    }

    const auth = response.headers.authorization;
    setToken(auth);
    console.log(getProfile);
    return getProfile();
  });
}

function register(user) {
  user = {
    username: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    userGroup: user.userGroup,
    passwordHash: user.password
  };

  return axios.post(apiBaseUrl + "users/register", user).then(response => {
    if (response.status !== 200) {
      console.log(response.statusText);
      return Promise.reject(response.statusText);
    }
    return response.data;
  });
}
