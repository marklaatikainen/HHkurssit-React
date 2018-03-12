import axios from "axios";
import { userService } from "../_services";

export const courseService = {
  getAllCourses,
  getOwnCourses,
  addCourse,
  deleteCourse,
  restoreDefaults
};

const apiBaseUrl = "https://hhkurssit.markl.fi/";

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

async function deleteCourse(course) {
  const user = await userService.getUserInfo();

  return axios
    .delete(
      apiBaseUrl + "user/own/" + user.id + "/" + user.userGroup + "/" + course,
      {
        headers: { Authorization: userService.getToken() }
      }
    )
    .then(res => {
      return "Kurssi poistettu";
    })
    .catch(error => {
      return Promise.reject("Virhe kurssin poistossa!");
    });
}

async function addCourse(course) {
  const user = await userService.getUserInfo();
  return axios
    .post(
      apiBaseUrl + "user/own/" + user.id + "/" + user.userGroup + "/" + course,
      {},
      {
        headers: { Authorization: userService.getToken() }
      }
    )
    .then(res => {
      return "Kurssi lisätty";
    })
    .catch(error => {
      return Promise.reject("Virhe kurssin lisäyksessä!");
    });
}

async function restoreDefaults() {
  const user = await userService.getUserInfo();

  return axios
    .delete(apiBaseUrl + "user/own/restore/" + user.id, {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject("Virhe alkuperäisten kurssien palautuksessa!");
      }
      return "Alkuperäiset kurssit palautettu!";
    });
}
