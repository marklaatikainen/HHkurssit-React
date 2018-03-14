import axios from "axios";
import { userService } from "../_services";
import { apiBaseUrl } from "../_helpers";

export const settingsService = {
  getSettings
};

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
