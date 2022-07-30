import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";

import { ReduxModule } from "../modules/ReduxModule";
import Api from "src/utils/customApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducerType } from "../index";
import { store } from "../index";

interface trashType {
  type: string;
}

const HowtoPage = () => {
  //❌

  const [imgUrl, setImgUrl] = useState("");
  const [trashKinds, setTrashKinds] = useState("");

  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  console.log("제발 아이디 10 이여라 ", itemID);
  console.log(store.getState().ImgIDReducer);
  const userIdToRedux = ReduxModule().decodeInfo?.id;
  //const trashKindList = state.trashName.split(","); // [GLASS,PAPER]

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

  console.log(trashKindList);

  //❌
  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
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
            mt: 7,
          }}
        >
          <img src={imgUrl as string} />
        </Box>

        {trashKindList?.map((item: string, index: any) => (
          <ExplanationTrash key={index} kind={item} imgURL={imgUrl} />
        ))}
      </div>
    </Box>
  );
};

export default HowtoPage;
