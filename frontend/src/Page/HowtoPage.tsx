import * as React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";

import { ReduxModule } from "../modules/ReduxModule";
import { useSelector } from "react-redux";
import { RootReducerType } from "../index";
import ReduxImgApi from "../modules/ReduxImgApi";

interface trashType {
  type: string;
}

const HowtoPage = () => {
  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  const userIdToRedux = ReduxModule().decodeInfo?.id;

  const reduxKindAndImg = ReduxImgApi(itemID, userIdToRedux);

  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        <Box
          sx={{
            borderRadius: 3,
            backgroundColor: "white",
            width: 700,
            height: 350,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "1px 3px 3px #B0B09A",
            mt: 7,
            mb: 10,
          }}
        >
          <img src={reduxKindAndImg.imgUrl as string} />
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: 50, mt: 10, fontFamily: "Itim" }}>
            How to recycle?
          </Typography>
          {reduxKindAndImg.trashKinds?.map((item: string, index: any) => (
            <ExplanationTrash
              key={index}
              kind={item}
              imgURL={reduxKindAndImg.imgUrl}
            />
          ))}

          <Link
            href="/mypage"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "Itim",
              padding: 100,
              color: "black",
              fontSize: 30,
            }}
          >
            {" "}
            go to mypage{">>"}{" "}
          </Link>
        </Grid>
      </div>
    </Box>
  );
};

export default HowtoPage;