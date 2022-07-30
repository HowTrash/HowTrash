import { Grid, Box, Typography, autocompleteClasses } from "@mui/material";
import * as React from "react";
import constants from "../../utils/constants";
import { useState, useEffect } from "react";
import Api from "src/utils/customApi";
import { CollectionsOutlined } from "@mui/icons-material";
import { ReduxModule } from "../../modules/ReduxModule";

import { useSelector } from "react-redux";
import { RootReducerType } from "../../index";

interface trashType {
  kind: string;
  tag: string;
  method1: string;
  method2: string;
  method3: string;
  warning: string;
}

const HowtoResult = (props: any) => {
  const [imgKind, setImgKind] = useState("");
  const [imgAddress, setImgAddress] = useState("");
  const [resTrash, setResTrash] = useState<trashType | undefined>();
  //❌
  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  console.log("제발 아이디 10 이여라 ", itemID);
  //❌
  const userIdtoRedux = ReduxModule().decodeInfo?.id;
  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );
  console.log(reduxToken, "redux value in Explanation");

  useEffect(() => {
    //❌
    // const testImage = async () => {
    //   const result = await Api.get(
    //     `http://localhost:8080/trash/mypage/users/${userIdtoRedux}/images`
    //   ).then((res) => res.data);
    //   setImgAddress(result[result.length - 1].img); //최근 생성된 배열 값 가져오기
    //   setImgKind(result[result.length - 1].trash_kind); // 이거 두개 이상이 되는데 ?
    //   console.log("not????", imgKind);
    //   if (imgKind == "BIODEGRADABLE") {
    //     //props 대신 imgkind
    //     setResTrash(constants.BIODEGRADABLE);
    //   }
    //   if (imgKind == "GLASS") {
    //     setResTrash(constants.GLASS);
    //   }
    //   if (imgKind == "CARDBOARD") {
    //     setResTrash(constants.CARDBOARD);
    //   }
    //   if (imgKind == "METAL") {
    //     setResTrash(constants.METAL);
    //   }
    //   if (imgKind == "PAPER") {
    //     setResTrash(constants.PAPER);
    //   }
    //   if (imgKind == "PLASTIC") {
    //     setResTrash(constants.PLASTIC);
    //   }
    // };
    // testImage();

    if (props.kind == "BIODEGRADABLE") {
      //props 대신 imgkind
      setResTrash(constants.BIODEGRADABLE);
    }
    if (props.kind == "GLASS") {
      setResTrash(constants.GLASS);
    }
    if (props.kind == "CARDBOARD") {
      setResTrash(constants.CARDBOARD);
    }
    if (props.kind == "METAL") {
      setResTrash(constants.METAL);
    }
    if (props.kind == "PAPER") {
      setResTrash(constants.PAPER);
    }
    if (props.kind == "PLASTIC") {
      setResTrash(constants.PLASTIC);
    }
    //더보기 눌렀을때는 id까지 필요하다 .result[result.length - 1].id 그리고 이미지 값 필요없음 ?
    //❌
  }, [imgKind]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={{
        backgroundColor: "white",
        borderRadius: 10,
        margin: "auto",
        border: 1.5,
        borderColor: "black",
        mt: 10,
        height: "auto",
        width: "auto",
        marginX: 20,
      }}
    >
      <Box sx={{ width: "auto", height: "auto", margin: 8 }}>
        <img style={{ borderRadius: 10 }} src={props.imgURL as string} />
      </Box>
      <Box sx={{ width: "auto", height: "auto", margin: 2 }}>
        <Typography
          component="h1"
          fontWeight="bold"
          variant="h4"
          align="left"
          sx={{ mt: 5, marginLeft: 1 }}
        >
          {resTrash?.kind}
          <br />
        </Typography>

        <Typography
          align="left"
          sx={{ mt: 3, marginLeft: 1 }}
          fontSize="16px"
          fontWeight="bold"
        >
          {resTrash?.tag}
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
          {resTrash?.method1}
          <br />
          <br />
          {resTrash?.method2}
          <br />
          <br />
          {resTrash?.method3}
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

        <Typography align="left" sx={{ margin: 1, marginBottom: 5 }}>
          {resTrash?.warning}
        </Typography>
      </Box>
    </Grid>
  );
};

export default HowtoResult;
