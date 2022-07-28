import { Grid, Box, Typography } from "@mui/material";
import * as React from "react";
import constants from "../../utils/constants";

const HowtoResult = ({ props }: any) => {
  console.log(props);
  console.log(constants.GLASS);

  // if(props == "BIODEGRADABLE"){
  //     const csTrash = constants.BIODEGRADABLE
  // }
  const resTrash = constants.BIODEGRADABLE; // ⭕️위에 처럼 들어오는 거 구현되면 if로 묶어

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={{
        backgroundColor: "#00ff0000",
        margin: "auto",
        mt: 10,
        width: "100ch",
      }}
    >
      <Box sx={{ width: "45ch", height: "auto" }}>사진 넣을 공간</Box>
      <Box sx={{ width: "54ch", height: "auto" }}>
        <Typography
          component="h1"
          fontWeight="bold"
          variant="h4"
          align="left"
          sx={{ mt: 5, marginLeft: 1 }}
        >
          {resTrash.kind}
          <br />
        </Typography>

        <Typography
          align="left"
          sx={{ mt: 3, marginLeft: 1 }}
          fontSize="16px"
          fontWeight="bold"
        >
          {resTrash.tag}
          <br />
          <br />
        </Typography>

        <Typography
          align="left"
          sx={{ mt: 3, marginLeft: 1 }}
          fontSize="16px"
        ></Typography>

        <Typography align="left" sx={{ mt: 5, marginLeft: 1 }} variant="h6">
          버리는 방법
        </Typography>

        <Typography align="left" sx={{ margin: 1 }}>
          {resTrash.method1}
          <br />
          <br />
          {resTrash.method2}
          <br />
          <br />
          {resTrash.method3}
          <br />
          <br />
        </Typography>

        <Typography
          align="left"
          sx={{ mt: 5, marginLeft: 1 }}
          variant="h6"
          fontWeight="bold"
        >
          알아두면 좋은 점
        </Typography>

        <Typography align="left" sx={{ margin: 1 }}>
          {resTrash.warning}
        </Typography>
      </Box>
    </Grid>
  );
};

export default HowtoResult;
