import axios, { AxiosRequestConfig } from "axios";
import { rs } from "src/utils/types";
import { setToken, getToken, deleteToken } from "./tokenManager";
import { API_BASE_URL } from "src/utils/constants";

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refresh_token = getToken().refresh;
  let accessToken = getToken().access;

  const body = {
    refresh_token,
  };

  const data: rs.UserAuth = await axios
    .post(`${API_BASE_URL}/auth/`, body)
    .then((res) => res.data)
    // eslint-disable-next-line no-alert
    .catch((e) => window.alert(e));
  accessToken = data.access_token;

  console.log("새로운 억셋으", accessToken);

  const newRefresh = data.refresh_token;
  setToken(accessToken, newRefresh);
  console.log("새로운 맆레시", newRefresh);
  window.location.reload();

  return config;
};

const refreshErrorHandle = () => {
  deleteToken("refresh_token");
};

export { refresh, refreshErrorHandle };
