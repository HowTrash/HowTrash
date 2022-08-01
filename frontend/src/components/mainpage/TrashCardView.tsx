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

interface BaseContent {
  kind: string;
  images: any;
}

const trashlist : BaseContent[] =[
  {
    kind : "",
    images: ``
  },
  {
    kind : "",
    images: ``
  },
  {
    kind : "",
    images: ``
  },
]

const ranklist: BaseContent[] =
[
  {
    kind : "GLASS",
    images: `https://i.ibb.co/cXcx6Q5/2022-07-30-11-19-38.png`
  },
  {
    kind : "BIODEGRADABLE",
    images: `https://i.ibb.co/0MHvQZr/2022-07-30-11-23-56.png`
  },
  {
    kind : "CARDBOARD",
    images: `https://i.ibb.co/jHTxfbS/17457488-1837243389875287-7962009710514097503-n.jpg`
  },
  {
    kind : "PAPER",
    images: `https://i.ibb.co/7XPdFc5/2558-B64255-CF58-B833.jpg`
  },
  {
    kind : "METAL",
    images: `https://i.ibb.co/tsjSswc/2022-07-30-11-26-27.png`
  },
  {
    kind : "PLASTIC",
    images: `https://i.ibb.co/xLm0vv2/2022-07-30-11-20-36.png`
  },
]


function MultiActionAreaCard() {
  //  const [newData, setNewData] = useState<string | null>('');
  //  const [Ranking, setRanking] = useState<any[] | null>([]);
  //  const needRank : string[] = [];
  const [firstData, setFirstData] = useState<any | null>(null);
  const [secondData, setSecondData] = useState<any | null>(null);
  const [thridData, setThirdData] = useState<any | null>(null);

  const [firstImages, setFirstImages] = useState<any | null>(null);
  const [secondImages, setSecondImages] = useState<any | null>(null);
  const [thridImages, setThirdImages] = useState<any | null>(null);

  axios
    .get("http://localhost:8080/trash/statistics/ranking")
    .then((response) => {
      for (let i = 0; i < 3; i++) {
        trashlist[i].kind = response.data[i].kind;
        console.log("아 되는거?", trashlist[i].kind);
        // setRanking((e) => [...e, newData]);
        // setNewData(response.data[i].kind);
        for(let j = 0; j<6; j++){
          if(ranklist[j].kind === trashlist[i].kind){
            trashlist[i].images = ranklist[j].images;
          }
        }
      }
      setFirstData(trashlist[0].kind);
      setFirstImages(trashlist[0].images);
      setSecondData(trashlist[1].kind);
      setSecondImages(trashlist[1].images);
      setThirdData(trashlist[2].kind);
      setThirdImages(trashlist[2].images);
    })
    .catch((error) => {
      console.log("error", error.response);
    });


  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
      <Box sx={{ p: 2 }}>
        <FirstImg />
        <Card sx={{ width: 300, border: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={firstImages}
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

      <Box sx={{ p: 2 }}>
        <SecondImg />
        <Card sx={{ width: 300, border: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={secondImages}
            />
            <Typography
              fontWeight={"bold"}
              fontSize={20}
              component="div"
              margin={1}
              marginTop={2}
            >
              {secondData}
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

      <Box sx={{ p: 2 }}>
        <ThirdImg />
        <Card sx={{ width: 300, border: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={thridImages}
            />
            <Typography
              fontWeight={"bold"}
              fontSize={20}
              component="div"
              margin={1}
              marginTop={2}
            >
              {thridData}
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
      </Box >

  );
}

export default MultiActionAreaCard;