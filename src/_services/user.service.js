import axios from "axios";
import decode from "jwt-decode";

export const userService = {
  login,
  logout,
  register,
  updateProfile,
  getProfile,
  getToken,
  getUserInfo
};

const apiBaseUrl = "https://hhkurssit.markl.fi/";

function logout() {
  localStorage.removeItem("authorization_token");
}

async function getUserInfo() {
  const res = await axios.get(apiBaseUrl + "user/" + getProfile().sub, {
    headers: { Authorization: getToken() }
  });
  return res.data;
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
    return getProfile();
  });
}

function register(user) {
  user = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    userGroup: user.userGroup,
    passwordHash: user.password
  };
  return axios
    .post(apiBaseUrl + "user/register", user)
    .then(res => {
      if (res.status === 200) {
        return "Käyttäjä " + user.username + " on luotu";
      } else {
        return Promise.reject("Virhe rekisteröinnissä!");
      }
    })
    .catch(error => {
      return Promise.reject("Rekisteröinti epäonnistui!");
    });
}

function updateProfile(user) {
  user = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    userGroup: user.userGroup,
    passwordHash: user.password
  };
  return axios
    .put(apiBaseUrl + "user", user)
    .then(res => {
      if (res.status === 200) {
        return "Käyttäjätiedot on päivitetty!";
      } else {
        return Promise.reject("Virhe tallennuksessa!");
      }
    })
    .catch(error => {
      return Promise.reject("Virhe tallennuksessa!");
    });
}
