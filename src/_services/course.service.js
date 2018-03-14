import axios from "axios";
import { userService } from "../_services";

export const courseService = {
  getAllCourses
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
