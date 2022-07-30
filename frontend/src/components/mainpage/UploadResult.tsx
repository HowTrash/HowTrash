import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import InputIcon from "@mui/icons-material/Input";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../index";
import { ReduxModule } from "../../modules/ReduxModule";
import { useState } from "react";

import Api from "../../utils/customApi";

const UploadResult = () => {
  const navigate = useNavigate();

  //❌

  const [imgUrl, setImgUrl] = useState("");
  const [trashKinds, setTrashKinds] = useState("");
  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  const userIdToRedux = ReduxModule().decodeInfo?.id;

  const searchHowTrash = async () => {
    const result = await Api.get(
      `/trash/mypage/users/${userIdToRedux}/images/${itemID}`
    );
    setImgUrl(result.data[0].img);
    setTrashKinds(result.data[0].trash_kind);
  };
  searchHowTrash();
  console.log(imgUrl);
  console.log(trashKinds);

  const trashKindList = trashKinds.split(","); // 이거 api 바뀌면 배열로 바꿔야함

  //❌

  const onClickHowto = () => {
    navigate(`/howtopage`);
  };

  return (
    <Box textAlign={"center"}>
      <div>
        <Box
          sx={{
            borderRadius: 3,
            border: 1,
            borderColor: "black",
            backgroundColor: "white",
            width: 600,
            height: 300,
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 23,
          }}
        >
          <img src={imgUrl as string} />
        </Box>

        <Typography marginTop={5} fontWeight="bold" variant="h5">
          {trashKindList.map((item: string, index: any) => {
            if (item === "BIODEGRADABLE") {
              return <p key={index}>결과 : 음식물 쓰레기</p>;
            }
            if (item === "CARDBOARD") {
              return <p key={index}>결과 : 일반 쓰레기</p>;
            }
            if (item === "GLASS") {
              return <p key={index}>결과 : 유리</p>;
            }
            if (item === "METAL") {
              return <p key={index}>결과 : 캔</p>;
            }
            if (item === "PAPER") {
              return <p key={index}>결과 : 종이</p>;
            }
            if (item === "PLASTIC") {
              return <p key={index}>결과 : 플라스틱</p>;
            }
          })}
        </Typography>

        <Button
          onClick={onClickHowto}
          sx={{
            backgroundColor: "white",
            color: "#759F98",
            border: 2,
            borderRadius: 2,
            margin: "auto",
            mt: 6,
            width: "50ch",
          }}
        >
          <Typography
            sx={{ color: "black" }}
            fontSize={17}
            marginRight={2}
            fontWeight="bold"
          >
            쓰레기 올바르게 버리는 방법
          </Typography>
          <InputIcon fontSize="medium" sx={{ color: "black" }} />
        </Button>
      </div>
    </Box>
  );
};

export default UploadResult;
