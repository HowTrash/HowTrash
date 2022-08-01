import { useState, useEffect, useRef } from "react";
import { Box, Button, Link } from "@mui/material";
import lottie from "lottie-web";
import Main from "../images/mainBacl";
import StartLogo from "../images/startLogo";

const MainPageLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../images/mainLottie.json"),
    });
  }, []);
  return <Box ref={element} style={{ height: 300 }}></Box>;
};

const StartPage = () => {
  return (
    <Box
      display="flex"
      textAlign={"center"}
      style={{
        position: "absolute",
        backgroundColor: "white",
        backgroundSize: "cover",
        zIndex: 100,
        width: "100%",
        height: "100%",
      }}
    >
      <Main />

      {/* <MainPageLottie /> */}

      <StartLogo />
      <Link
        href="/mainpage"
        alignSelf="center"
        style={{ margin: "auto", textDecoration: "none", fontWeight: "bold" }}
      >
        <Button sx={{ fontFamily: "IrishGrover", color: "black" }}>
          start rebike ▶︎
        </Button>
      </Link>
    </Box>
  );
};

export default StartPage;
