import axios from "axios";
import { userService } from "../_services";
import { apiBaseUrl } from "../_helpers";

export const timeService = {
  getCourseTime,
  getOwnTime,
  getGroupTime
};

async function getCourseTime(course, period) {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/course/" + course + "/" + period, {
        headers: { Authorization: userService.getToken() }
      })
      .then(res => {
        if (res.data === "Request not authorized") {
          reject(Error(res.data))
        } else {
          resolve(res.data);
        }
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

async function getGroupTime(group, period) {
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/group/" + group + "/" + period, {
        headers: { Authorization: userService.getToken() }
      })
      .then(res => {
        if (res.data === "Request not authorized") {
          reject(Error(res.data))
        } else {
          resolve(res.data);
        }
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}

async function getOwnTime(period) {
  const user = await userService.getUserInfo();
  return new Promise(function(resolve, reject) {
    axios
      .get(apiBaseUrl + "time/user/" + user.userGroup + "/" + user.id + "/" + period, {
        headers: { Authorization: userService.getToken() }
      })
      .then(res => {
        if (res.data === "Request not authorized") {
          reject(Error(res.data))
        } else {
          resolve(res.data);
        }
      })
      .catch(function(error) {
        reject(Error(error));
      });
  });
}
