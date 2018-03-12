import axios from "axios";
import { userService } from "../_services";

export const settingsService = {
  getSettings
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
