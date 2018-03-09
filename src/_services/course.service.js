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
  return axios.get(apiBaseUrl + "settings", {}).then(res => {
    if (res.status !== 200) {
      return Promise.reject(res.statusText);
    }
    return res.data[0];
  });
}

function getProgramList() {
  return axios.get(apiBaseUrl + "course/program", {}).then(res => {
    if (res.status !== 200) {
      return Promise.reject(res.statusText);
    }
    return res.data.vaihtoehdot;
  });
}

async function getUserInfo() {
  const res = await axios.get(
    apiBaseUrl + "user/" + userService.getProfile().sub,
    {
      headers: { Authorization: userService.getToken() }
    }
  );
  return res.data;
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
  const user = await getUserInfo();

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
  const user = await getUserInfo();

  const groupList = await getGroupCoursesList();
  const ownList = await getOwnCoursesList();

  // mikäli kummastakaan listasta ei löydy kurssia, niin lisätään se omiin
  if (groupList.indexOf(course) === -1 && ownList.indexOf(course) === -1) {
    // Lisätään kurssi
    axios
      .post(
        apiBaseUrl + "user/own/l/" + user.id + "/" + course,
        {},
        {
          headers: { Authorization: userService.getToken() }
        }
      )
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });

    // mikäli tämä on ryhmän kurssi, niin lisätään se omiin poistettuna
  } else if (groupList.indexOf(course) !== -1) {
    axios
      .post(
        apiBaseUrl + "user/own/p/" + user.id + "/" + course,
        {},
        {
          headers: { Authorization: userService.getToken() }
        }
      )
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });

    // mikäli omista löytyy, niin poistetaan se
  } else if (ownList.indexOf(course) !== -1) {
    axios
      .delete(
        apiBaseUrl + "user/own/" + user.id + "/" + course,
        {},
        {
          headers: { Authorization: userService.getToken() }
        }
      )
      .then(res => {
        return res.data;
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
  const user = await getUserInfo();

  return axios
    .delete(apiBaseUrl + "user/own/restore/" + user.id, {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data;
    });
}

async function getOwnCoursesList() {
  const user = await getUserInfo();

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
  const user = await getUserInfo();

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

async function getCourseTimetable(course) {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/course/" + course, {
        headers: { Authorization: userService.getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

async function getGroupTimetable(group) {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/group/" + group, {
        headers: { Authorization: userService.getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

async function getOwnTimetable() {
  const user = await getUserInfo();

  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/user/" + user.id, {
        headers: { Authorization: userService.getToken() }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}
