import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import FirstImg from "../../images/firstImg";
import SecondImg from "../../images/secondImg";
import ThirdImg from "../../images/thirdImg";
import { decodeToken } from "src/Auth/tokenGetter";
import axios from "axios";
import { response } from "express";

interface BaseContent {
  kind: string;
  images: any;
}

const trashlist: BaseContent[] = [
  {
    kind: "",
    images: ``,
  },
  {
    kind: "",
    images: ``,
  },
  {
    kind: "",
    images: ``,
  },
];

const ranklist: BaseContent[] = [
  {
    kind: "GLASS",
    images: `https://i.ibb.co/g9rSyFX/31-OEv-Rve-V3-L-SY450.jpg`,
  },
  {
    kind: "BIODEGRADABLE",
    images: `https://i.ibb.co/0MHvQZr/2022-07-30-11-23-56.png`,
  },
  {
    kind: "CARDBOARD",
    images: `https://i.ibb.co/jHTxfbS/17457488-1837243389875287-7962009710514097503-n.jpg`,
  },
  {
    kind: "PAPER",
    images: `https://i.ibb.co/7XPdFc5/2558-B64255-CF58-B833.jpg`,
  },
  {
    kind: "METAL",
    images: `https://i.ibb.co/tsjSswc/2022-07-30-11-26-27.png`,
  },
  {
    kind: "PLASTIC",
    images: `https://i.ibb.co/xLm0vv2/2022-07-30-11-20-36.png`,
  },
];

function MultiActionAreaCard() {
  let navigate = useNavigate();

  const [firstData, setFirstData] = useState<BaseContent | null>(null);
  const [secondData, setSecondData] = useState<BaseContent | null>(null);
  const [thridData, setThirdData] = useState<BaseContent | null>(null);

  axios
    .get("http://localhost:8080/api/trash/statistics/ranking")
    .then((response) => {
      for (let i = 0; i < 3; i++) {
        trashlist[i].kind = response.data[i].kind;
        for (let j = 0; j < 6; j++) {
          if (ranklist[j].kind === trashlist[i].kind) {
            trashlist[i].images = ranklist[j].images;
          }
        }
      }
      /*
      trashlist.forEach(kindlist => {
       kindlist.kind = response.data.kind
       ranklist.forEach(imagelist => {
         if (imagelist.kind === kindlist.kind)
         kindlist.images = imagelist.images;
       })})
       */
      setFirstData(trashlist[0]);
      setSecondData(trashlist[1]);
      setThirdData(trashlist[2]);
    })
    .catch((error) => {
      console.log("error", error.response);
    });

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}
    >
      <Box sx={{ p: 2 }}>
        <FirstImg />
        <Card sx={{ width: 300, border: 1 }}>
          <CardActionArea>
            <CardMedia component="img" height="300" image={firstData?.images} />
            <Typography
              fontWeight={"bold"}
              fontSize={20}
              component="div"
              margin={1}
              marginTop={2}
            >
              {firstData?.kind}
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() => {
                navigate(`/defaulthowpage`, {
                  state: {
                    needKind: firstData?.kind,
                    needImages: firstData?.images,
                  },
                });
              }}
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
              image={secondData?.images}
            />
            <Typography
              fontWeight={"bold"}
              fontSize={20}
              component="div"
              margin={1}
              marginTop={2}
            >
              {secondData?.kind}
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() => {
                navigate(`/defaulthowpage`, {
                  state: {
                    needKind: secondData?.kind,
                    needImages: secondData?.images,
                  },
                });
              }}
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
            <CardMedia component="img" height="300" image={thridData?.images} />
            <Typography
              fontWeight={"bold"}
              fontSize={20}
              component="div"
              margin={1}
              marginTop={2}
            >
              {thridData?.kind}
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() => {
                navigate(`/defaulthowpage`, {
                  state: {
                    needKind: thridData?.kind,
                    needImages: thridData?.images,
                  },
                });
              }}
              size="small"
              sx={{ margin: "auto", bgcolor: "#C0F0FF", border: 1 }}
            >
              더보기
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}

export default MultiActionAreaCard;
