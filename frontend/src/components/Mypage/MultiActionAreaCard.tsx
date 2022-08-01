import * as React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardMedia,
  Typography,
  styled,
  Link,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { save_ID } from "../../actions/ImgIDActions";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../index";

const MyTrashcanBtn = styled(Button)(({}) => ({
  backgroundColor: "#B0B09A",
  borderColor: "#B0B09A",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
    borderColor: "#B0B09A",
  },
}));

export default function MultiActionAreaCard({ image = "", id = 0 }) {
  const dispatch = useDispatch();
  const itemID = useSelector((state: RootReducerType) => state.ImgIDReducer);
  console.log(itemID);
  const onDispatch = () => {
    dispatch(save_ID(id));

    console.log(itemID);
  };

  return (
    <Card sx={{ maxWidth: 170, border: 1, margin: 1.4 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          width="170"
          image={image}
          style={{ padding: 3, borderRadius: 8 }}
        />
      </CardActionArea>
      <CardActions>
        <MyTrashcanBtn
          variant="outlined"
          sx={{
            margin: "auto",
            width: 70,
            height: 20,
            bgcolor: "#B0B09A",
            borderColor: "#B0B09A",
            color: "black",
          }}
        >
          <Link
            href={`/mypage/${id}/howtopage`}
            onClick={onDispatch}
            sx={{ fontSize: 2, color: "black", textDecoration: "none" }}
          >
            상세보기
          </Link>
        </MyTrashcanBtn>
      </CardActions>
    </Card>
  );
}
