/* eslint-disable prettier/prettier */
import {
  axios
} from "../lib/axios";

export const getFunds = ({
  url,
  token
}) => {
  return axios.get(new URL("/api/addin/funds", url).toString(), {
    headers: {
      Authorization: token,
    },
  });
};