import { userService } from "../_services";

export const apiBaseUrl = "https://hhkurssit.markl.fi/";

export const authHeader = {
  headers: { Authorization: userService.getToken() }
};
