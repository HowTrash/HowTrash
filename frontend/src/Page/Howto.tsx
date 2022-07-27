import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import HowtoResult1 from "../components/howtopage/HowtoResult1";

const Howto = () => {
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
