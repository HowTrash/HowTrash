import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../component/mainpage/SearchBar";
import HowtoResult1 from "../component/howtopage/HowtoResult1";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../index";

const Howto = () => {
  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );

  console.log("Howto에서 실행됐나?", reduxToken.decodeInfo?.alias);
  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <HowtoResult1 />
      </div>
    </Box>
  );
};

export default Howto;
