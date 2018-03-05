import { setToken, getToken, getProfile } from "../components/Functions";
import axios from "axios";

const apiBaseUrl = "https://hhkurssit.markl.fi/";

export function login(payload) {
  return new Promise(function(resolve, reject) {
    axios
      .post(apiBaseUrl + "login", payload)
      .then(response => {
        const auth = response.headers.authorization;
        setToken(auth);
        resolve("Logged in");
      })
      .catch(err => {
        reject(Error(err.message));
      });
  });
}

export function register(payload) {
  return new Promise(function(resolve, reject) {
    axios
      .post(apiBaseUrl + "users/register", payload)
      .then(response => {
        resolve(response);
      })
      .catch(function(error) {
        reject(Error("Ongelmia rekisteröitymisessä. Kokeile uudelleen."));
      });
  });
}

export function updateProfile(payload) {
  return new Promise(function(resolve, reject) {
    axios
      .put(apiBaseUrl + "user", payload, {
        headers: { Authorization: getToken() }
      })
      .then(response => {
        resolve(response);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

export async function userInfo() {
  const res = await axios.get(apiBaseUrl + "user/" + getProfile().sub, {
    headers: { Authorization: getToken() }
  });
  return res.data;
}

export async function findAllCourses() {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "course/all", {
        headers: { Authorization: getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

export async function getProgramList() {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "course/program")
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

export async function getSettings() {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "settings", {})
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

export async function getOwnCourses() {
  const user = await userInfo();
  const res = await axios.get(
    apiBaseUrl + "user/" + user.id + "/" + user.userGroup,
    {
      headers: { Authorization: getToken() }
    }
  );
  return res.data;
}

export async function updateCourse(input) {
  const user = await userInfo();

  const groupList = await getGroupCoursesList();
  const ownList = await getOwnCoursesList();

  // mikäli kummastakaan listasta ei löydy kurssia, niin lisätään se omiin
  if (groupList.indexOf(input) === -1 && ownList.indexOf(input) === -1) {
    // Lisätään kurssi
    axios
      .post(
        apiBaseUrl + "user/own/l/" + user.id + "/" + input,
        {},
        {
          headers: { Authorization: getToken() }
        }
      )
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });

    // mikäli tämä on ryhmän kurssi, niin lisätään se omiin poistettuna
  } else if (groupList.indexOf(input) !== -1) {
    axios
      .post(
        apiBaseUrl + "user/own/p/" + user.id + "/" + input,
        {},
        {
          headers: { Authorization: getToken() }
        }
      )
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });

    // mikäli omista löytyy, niin poistetaan se
  } else if (ownList.indexOf(input) !== -1) {
    axios
      .delete(
        apiBaseUrl + "user/own/" + user.id + "/" + input,
        {},
        {
          headers: { Authorization: getToken() }
        }
      )
      .then(res => {
        console.log(res);
        //        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });

    // @TODO: Testauksen ajaksi varmuuden vuoksi tämä
  } else {
    console.log("Tämän ei pitäisi toteutua??!!");
  }
}

export async function restoreDefaults() {
  const user = await userInfo();
  axios
    .delete(apiBaseUrl + "user/own/restore/" + user.id, {
      headers: { Authorization: getToken() }
    })
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
    });
}

export async function getOwnCoursesList() {
  const user = await userInfo();

  const ownList = [];
  const res = await axios.get(apiBaseUrl + "user/own" + user.id, {
    headers: { Authorization: getToken() }
  });
  if (res.data !== "") {
    res.data.map(oma => {
      return ownList.push(oma.opintotunnus);
    });
  }
  return ownList;
}

export async function getGroupCoursesList() {
  const user = await userInfo();

  const groupList = [];
  const res = await axios.get(apiBaseUrl + "group/" + user.userGroup, {
    headers: { Authorization: getToken() }
  });
  if (res.data !== "") {
    res.data.map(course => {
      return groupList.push(course.kurssi_id);
    });
  }
  return groupList;
}

export async function getCourseTimetable(course) {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/course/" + course, {
        headers: { Authorization: getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

export async function getGroupTimetable(group) {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/group/" + group, {
        headers: { Authorization: getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

export async function getOwnTimetable() {
  const user = await userInfo();

  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/user/" + user.id, {
        headers: { Authorization: getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}
