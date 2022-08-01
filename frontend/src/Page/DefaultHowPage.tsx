import * as React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/mainpage/SearchBar";
import ExplanationTrash from "../components/howtopage/ExplanationTrash";

import {useLocation} from 'react-router-dom';

const HowtoPage = () => {

  const item = useLocation();
  const itemform = item?.state as any;

    const itemImage = itemform.needImages;
    const itemKind = itemform.needKind;

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
            <img src={itemImage} style = {{height:280, width: 400}}/>

        </Box>
          <ExplanationTrash
            kind={itemKind}
          />
      </div>
    </Box>
  );
};

export default HowtoPage;
