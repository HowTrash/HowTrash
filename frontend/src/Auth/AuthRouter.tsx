import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { rs } from "src/utils/types";
import { checkAccessToken } from "./checkToken";

export function AuthRouter() {
  useEffect(() => {
    (async () => {
      // 토큰이 로컬 스토리지에 없으면 로그아웃 상태이게끔
      // checkAccessToken 에서 확인을 해줌
      const token = checkAccessToken();
      console.log("원래 토큰", token);
      if (!token) {
        window.location.replace("/login");
        alert("로그인이 필요합니다.");
      }
    })();
  }, []);
  return <Outlet />;
}

export default AuthRouter;
