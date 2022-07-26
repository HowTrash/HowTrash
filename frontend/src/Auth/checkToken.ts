import { useState } from "react";
import Api from "src/utils/customApi";
import { rs } from "src/utils/types";
import { refresh, refreshErrorHandle } from "./refresh";
import { getToken } from "./tokenManager";

const checkAccessToken = () => {
  const access_token = getToken().access;
  if (access_token) {
    const token: rs.TokenInfo = JSON.parse(access_token);
    console.log("확인 억셋으", token);

    const nowTime = new Date().getTime();

    const tokenExpire = token.expiry;
    console.log("시간?", tokenExpire);
    console.log("now시간?", nowTime);

    // 만료일이 지나면 refresh 토큰 확인
    if (tokenExpire - nowTime <= 0) {
      checkRefreshToken();
    }

    return token;
  }
};

const checkRefreshToken = () => {
  const refresh_token = getToken().access;
  if (refresh_token) {
    const token: rs.TokenInfo = JSON.parse(refresh_token);
    console.log("확인 맆레싀", token);

    const nowTime = new Date().getTime();
    const tokenExpire = token.expiry;
    console.log("시간?", tokenExpire);
    console.log("now시간?", nowTime);

    // refresh 토큰 만료일이 지나면 localStorage clear
    if (tokenExpire - nowTime <= 0) {
      alert("다시 로그인 해주세요.");
      localStorage.clear();
      window.location.replace("/login");
    }

    // refresh 토큰의 만료일이 아직 안지났을때 새로운 access 토큰을 불러오는 함수
    Api.interceptors.request.use(refresh, refreshErrorHandle);

    return token;
  }
};

export { checkAccessToken, checkRefreshToken };
