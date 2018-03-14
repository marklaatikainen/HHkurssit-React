import axios from "axios";

import { userService } from "../_services";
import { apiBaseUrl, authHeader } from "../_helpers";

export const ownService = {
  getOwnCourses,
  addCourse,
  deleteCourse,
  restoreDefaults
};

async function getOwnCourses() {
  const user = await userService.getUserInfo();

  return axios
    .get(apiBaseUrl + "user/" + user.id + "/" + user.userGroup, authHeader)
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
      authHeader
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
      authHeader
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
    .delete(apiBaseUrl + "user/own/restore/" + user.id, authHeader)
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject("Virhe alkuperäisten kurssien palautuksessa!");
      }
      return "Alkuperäiset kurssit palautettu!";
    });
}
