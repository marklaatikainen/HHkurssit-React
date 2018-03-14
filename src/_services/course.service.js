import axios from "axios";

import { apiBaseUrl, authHeader } from "../_helpers";

export const courseService = {
  getAllCourses
};

function getAllCourses() {
  return axios
    .get(apiBaseUrl + "course/all", authHeader)
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data;
    });
}
