import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import UploadImage from "../components/mainpage/UploadImage";
import PopularTrash from "../components/mainpage/PopularTrash";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import StartPage from "./StartPage";

const MainLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../images/mainbike.json"),
    });
  }, []);
  return <Box ref={element} style={{ marginTop: 100, height: 250 }}></Box>;
};

const MainPage = () => {
  return (
    <Box textAlign={"center"}>
      <div>
        <StartPage />
        <MainLottie />
        <SearchBar />
        <UploadImage />
        <PopularTrash />
      </div>
    </Box>
  );
};

export default MainPage;
