import * as React from "react";
import { useState, useEffect } from "react";
import Api from "src/utils/customApi";
import { rs } from "src/utils/types";
import { setAccessToken, setRefreshToken } from "src/Auth/tokenManager";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import FirstImg from '../../images/firstImg'
import SecondImg from '../../images/secondImg';
import ThirdImg from '../../images/thirdImg';
import { decodeToken } from "src/Auth/tokenGetter";
import axios from 'axios';
import { response } from "express";

interface Content {
  kind: string;
  cnt: number;
}

interface Ranklist {
  kind: string;
  imgs: any;
}


const trashlist: Content[] =
[
    {
      kind: " ",
      cnt: 0,
    },
    {
      kind: " ",
      cnt: 0,
    },
    {
      kind: " ",
      cnt: 0,
    },
  ]


function Ranking() {
  const [firstData, setFirstData] = useState("");
  const [secondtData, setSecondData] = useState("");
  const [thirdData, setThirdData] = useState("");

  axios
    .get("http://localhost:8080/trash/statistics/ranking")
    .then((response) => {
      for (let i = 0; i < 3; i++) {
        trashlist[i].kind = response.data[i].kind;
        console.log("아 되는거?",trashlist[i].kind);
      }
    })
    .catch((error) => {
      console.log("error", error.response);
    });


  return (
    <Box sx={{ p: 2 }}>
      <FirstImg />
      <Card sx={{ maxWidth: 300, border: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image="https://picsum.photos/400/300"
          />
          <Typography
            fontWeight={"bold"}
            fontSize={20}
            component="div"
            margin={1}
            marginTop={2}
          >
            {firstData}
          </Typography>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            sx={{ margin: "auto", bgcolor: "#C0F0FF", border: 1 }}
          >
            더보기
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Ranking;
