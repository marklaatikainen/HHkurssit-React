import axios from "axios";
import { userService } from "../_services";

export const courseService = {
  getSettings,
  getAllCourses,
  getProgramList,
  getOwnCourses,
  updateCourse,
  restoreDefaults
};

const apiBaseUrl = "https://hhkurssit.markl.fi/";

function getSettings() {
  return axios
    .get(apiBaseUrl + "settings", {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data[0];
    });
}

function getProgramList() {
  return axios
    .get(apiBaseUrl + "course/program", {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data.vaihtoehdot;
    });
}

function getAllCourses() {
  return axios
    .get(apiBaseUrl + "course/all", {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data;
    });
}

async function getOwnCourses() {
  const user = await userService.getUserInfo();

  return axios
    .get(apiBaseUrl + "user/" + user.id + "/" + user.userGroup, {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data;
    });
}

async function updateCourse(course) {
  const user = await userService.getUserInfo();

  const groupList = await getGroupCoursesList();
  const ownList = await getOwnCoursesList();

  // mikäli kummastakaan listasta ei löydy kurssia, niin lisätään se omiin
  if (groupList.indexOf(course) === -1 && ownList.indexOf(course) === -1) {
    // Lisätään kurssi
    return axios
      .post(
        apiBaseUrl + "user/own/l/" + user.id + "/" + course,
        {},
        {
          headers: { Authorization: userService.getToken() }
        }
      )
      .then(res => {
        return "Kurssi lisätty";
      })
      .catch(error => {
        return Promise.reject(error);
      });

    // mikäli tämä on ryhmän kurssi, niin lisätään se omiin poistettuna
  } else if (groupList.indexOf(course) !== -1) {
    return axios
      .post(
        apiBaseUrl + "user/own/p/" + user.id + "/" + course,
        {},
        {
          headers: { Authorization: userService.getToken() }
        }
      )
      .then(res => {
        return "Kurssi poistettu";
      })
      .catch(error => {
        return Promise.reject(error);
      });

    // mikäli omista löytyy, niin poistetaan se
  } else if (ownList.indexOf(course) !== -1) {
    return axios
      .delete(
        apiBaseUrl + "user/own/" + user.id + "/" + course,
        {},
        {
          headers: { Authorization: userService.getToken() }
        }
      )
      .then(res => {
        return "Kurssi poistettu";
      })
      .catch(error => {
        return Promise.reject(error);
      });

    // @TODO: Testauksen ajaksi varmuuden vuoksi tämä
  } else {
    console.log("Tämän ei pitäisi toteutua??!!");
  }
}

async function restoreDefaults() {
  const user = await userService.getUserInfo();

  return axios
    .delete(apiBaseUrl + "user/own/restore/" + user.id, {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.status;
    });
}

async function getOwnCoursesList() {
  const user = await userService.getUserInfo();

  const ownList = [];
  const res = await axios.get(apiBaseUrl + "user/own" + user.id, {
    headers: { Authorization: userService.getToken() }
  });
  if (res.data !== "") {
    res.data.map(oma => {
      return ownList.push(oma.opintotunnus);
    });
  }
  return ownList;
}

async function getGroupCoursesList() {
  const user = await userService.getUserInfo();

  const groupList = [];
  const res = await axios.get(apiBaseUrl + "group/" + user.userGroup, {
    headers: { Authorization: userService.getToken() }
  });
  if (res.data !== "") {
    res.data.map(course => {
      return groupList.push(course.kurssi_id);
    });
  }
  return groupList;
}
