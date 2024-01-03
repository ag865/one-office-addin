import {
  axios
} from "../lib/axios";

export const getTenantByToken = (data) => {
  return axios.post(new URL("/api/auth/token", data.url).toString(), data);
};