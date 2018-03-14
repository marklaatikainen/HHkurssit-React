import axios from "axios";

import { apiBaseUrl, authHeader } from "../_helpers";

export const optionService = {
  getList
};

function getList() {
  return axios.get(apiBaseUrl + "course/optionlists", authHeader).then(res => {
    if (res.status !== 200) {
      return Promise.reject(res.statusText);
    }
    return res.data;
  });
}
