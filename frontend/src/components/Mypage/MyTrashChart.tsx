import * as React from "react";
import { Typography, Container, Box } from "@mui/material";
import Chart from "../chart/Chart";
import Date from "../chart/Date";

function MyTrashcan() {
  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
        height: "80vh",
      }}
    >
      <Typography
        color="black"
        fontWeight="bold"
        sx={{ mt: 1.2, mb: 1, fontSize: "medium" }}
      >
        내 쓰레기 통계
      </Typography>
      <Container
        style={{
          borderRadius: 8,
          backgroundColor: "white",
          height: "50vh",
        }}
        sx={{ mt: 3 }}
      >
        <Date />
        <Chart />
      </Container>
    </Container>
  );
}

export default MyTrashcan;
