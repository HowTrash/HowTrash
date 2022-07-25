import axios from "axios";
import { rs } from "src/utils/types";
import { decodeToken } from "./tokenGetter";

// 받아온 토큰을 만료일을 설정해 로컬 스토리지에 저장
const setToken = (accessToken: string, refreshtoken: string) => {
  console.log("잘 들어왔나?", accessToken);
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  const today = new Date();
  const accessExpires = new Date();
  const refreshExpires = new Date();

  accessExpires.setTime(today.getTime() + 1000 * 60 * 30); // 만료 30분
  refreshExpires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 14); // 만료 14일

  //   decodeToken(accessToken);
  console.log("만료시간", accessExpires);
  const accessStorage: rs.TokenInfo = {
    value: accessToken,
    expiry: accessExpires,
  };
  localStorage.setItem("access_token", JSON.stringify(accessStorage));

  const refreshStorage = {
    value: refreshtoken,
    expiry: refreshExpires,
  };
  localStorage.setItem("refresh_token", JSON.stringify(refreshStorage));
};

// 로컬 스토리지에 있는 토큰을 확인
const getToken = () => {
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");

  console.log("확인 억셋으", access);
  console.log("확인 맆레시", refresh);
};

// 로컬 스토리지에 있는 토큰을 clear
const deleteToken = (clearToken: string) => {
  localStorage.removeItem(clearToken);
};

export { setToken, getToken, deleteToken };
