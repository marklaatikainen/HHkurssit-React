import axios from "axios";

import { userService } from "../_services";

export const optionService = {
  getList
};

const apiBaseUrl = "https://hhkurssit.markl.fi/";

function getList() {
  return axios
    .get(apiBaseUrl + "course/optionlists", {
      headers: { Authorization: userService.getToken() }
    })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.statusText);
      }
      return res.data;
    });
}
