import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { rs } from "src/utils/types";
import { checkAccessToken } from "./checkToken";

export function AuthRouter() {
  useEffect(() => {
    (async () => {
      const token = checkAccessToken();
    })();
  });
  return <Outlet />;
}

export default AuthRouter;
