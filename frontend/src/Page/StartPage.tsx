import { useState, useEffect, useRef } from "react";
import { Box, Button, Link } from "@mui/material";
import lottie from "lottie-web";
import Main from "../images/mainBacl";
import StartLogo from "../images/startLogo";
import { Container } from "@mui/system";

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
        backgroundImage: "url(ggu2.jpg)",
        backgroundPosition: "center",
        margin: "auto",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display={"flex"} flexDirection="column" margin={"auto"}>
        <StartLogo />
        <Link
          href="/mainpage"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <Button sx={{ fontFamily: "IrishGrover", color: "black" }}>
            start rebike ▶︎
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default StartPage;
