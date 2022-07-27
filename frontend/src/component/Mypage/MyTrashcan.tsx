import { useState, useEffect, useRef } from "react";
import { alpha, createTheme } from "@mui/material/styles";
import { Box, Typography, Container, styled, Switch } from "@mui/material";
import MultiActionAreaCard from "./MultiActionAreaCard";
import Api from "../../utils/customApi";
import lottie from "lottie-web";
import { rs } from "src/utils/types";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#76F2BE",
    "&:hover": {
      backgroundColor: alpha("#76F2BE", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "white",
  },
}));

const GetNoTrashLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../../images/noTrashLottie.json"),
    });
  }, []);
  return <Box ref={element} style={{ height: 300 }}></Box>;
};

function MyTrashcan() {
  const token = localStorage.getItem("access_token");
  console.log(token);

  const trashList = [] as unknown as rs.TrashList;

  const [trashes, setTrashes] = useState<rs.TrashList>(trashList);

  const fetchMyTrash = async () => {
    const result = await Api.get(

      "/trash/mypage/users/e1be84fa-4726-4916-8356-d7151f7be5a9/images"

    ).then((res) => res.data as rs.TrashList);
    // setTrashes(result);
    setTrashes(result);
    console.log("api요청 결과", result);

    // console.log("api요청 결과 아이디?",result[0].img)
    // console.log("정보 저장1",trashes)
  };

  useEffect(() => {
    if (token !== "") {
      fetchMyTrash();
    }
  }, []);

  useEffect(() => {
    console.log("정보 저장2", trashes);
    console.log("api요청 gilli", Object.keys(trashes).length);
  }, [trashes]);

  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          color="black"
          fontWeight="bold"
          sx={{ mt: 1.2, mb: 1, fontSize: "medium" }}
        >
          내 분리수거함
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography color="black" sx={{ mt: 2, mb: 1, fontSize: 2 }}>
            사진 자동으로 추가
          </Typography>
          <GreenSwitch
            defaultChecked
            size="small"
            style={{ color: "primary", backgroundColor: "#E7F5EF" }}
            inputProps={{ "aria-label": "controlled" }}
            sx={{ mt: 1.5 }}
          />
        </Box>
      </Box>
      <Container
        style={{
          backgroundColor: "white",
          border: "solid",
          borderRadius: 5,
          borderColor: "white",
          height: "100vh",
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        {Object.keys(trashes).length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <GetNoTrashLottie />
            <Typography
              justifyContent="center"
              textAlign="center"
              sx={{ marginTop: 5, fontSize: 12 }}
            >
              쓰레기를 사진을 업로드 해보세요.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {Object.values(trashes)?.map((item: rs.Trash, index: any) => (
              <MultiActionAreaCard
                image={item.img}
                kind={item.trash_kind}
                key={index}
              />
            ))}
          </Box>
        )}
      </Container>
    </Container>
  );
}

export default MyTrashcan;
