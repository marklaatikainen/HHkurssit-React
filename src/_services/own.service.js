import axios from "axios";
import { userService } from "../_services";

export const ownService = {
  getOwnCourses,
  addCourse,
  deleteCourse,
  restoreDefaults
};

const apiBaseUrl = "https://hhkurssit.markl.fi/";

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
      console.log(error)
      return Promise.reject("Virhe kurssin poistossa!");
    });
}

async function addCourse(course) {
  const user = await userService.getUserInfo();
  console.log(apiBaseUrl + "user/own/" + user.id + "/" + user.userGroup + "/" + course)
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
      console.log(error)
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
