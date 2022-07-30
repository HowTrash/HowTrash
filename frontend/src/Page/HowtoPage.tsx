import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";
import { useLocation } from "react-router";

import { ReduxModule } from "../modules/ReduxModule";
import Api from "src/utils/customApi";
import { useState, useEffect } from "react";

interface trashType {
  kind: string;
  tag: string;
  method1: string;
  method2: string;
  method3: string;
  warning: string;
}

const HowtoPage = () => {
  //❌
  const [imgKind, setImgKind] = useState("");
  const [imgAddress, setImgAddress] = useState("");

  const userIdToRedux = ReduxModule().decodeInfo?.id;

  const trashKindList = ["GLASS", "PAPER"]; // [GLASS,PAPER] 이거 대신 밑 axios 이용해서 kind 구하기

  const testImage = async () => {
    const result = await Api.get(
      `http://localhost:8080/trash/mypage/users/${userIdToRedux}/images`
    ).then((res) => res.data);
    setImgAddress(result[result.length - 1].img); //최근 생성된 배열 값 가져오기
    setImgKind(result[result.length - 1].trash_kind); // 이거 두개 이상이 되는데 ?
    console.log("not????", imgKind);
  }; //이걸로 가장 최신 등록 받아와서 trashKindList 고고

  //or mypage에서 넘겨준 경우 어떻게 해야될까 ?
  //밑에 리턴값에 삼항 연산자 줘서 mypage = true 면 받아온거 넘겨주고 아니면 mainpage에서 넘어온거니까 밑에꺼 그대로 실행

  //❌

  return (
    <Box textAlign={"center"}>
      <div>
        <SearchBar />
        {trashKindList.map((item: any, index: any) => (
          <ExplanationTrash
            kind={item}
            imgURL="http://image-bucket2.s3.ap-northeast-2.amazonaws.com/2022-07-3004:52:49.813457.jpeg"
          /> //여기 이미지도 줘야할듯하다
        ))}
      </div>
    </Box>
  );
};

export default HowtoPage;
