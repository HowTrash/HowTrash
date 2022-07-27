import * as React from "react";
import MyPageNavigation from "../component/Mypage/MyPageNavigation";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../index";

function MyPage() {
  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );
  console.log("Mypage에서 실행됐나?", reduxToken.decodeInfo?.alias);
  return (
    <Container
      style={{
        border: "solid",
        borderColor: "white",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mb: 20,
          mt: 20,
        }}
      >
        <MyPageNavigation />
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Container>
  );
}

export default MyPage;
