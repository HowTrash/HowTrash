import { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import MultiActionAreaCard from "./MultiActionAreaCard";
import Api from "../../utils/customApi";
import lottie from "lottie-web";
import MoreIcon from "../../images/moreIcon";
import { rs } from "src/utils/types";
import { getAccess } from "src/Auth/tokenManager";
import { ReduxModule } from "../../modules/ReduxModule";

interface Props {
  trashlist?: Array<rs.Trash>;
}

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

function MyTrashcan(props: Props) {
  const what: any = getAccess();
  const userIdtoRedux = ReduxModule().decodeInfo?.id;

  const [trashes, setTrashes] = useState(props.trashlist);
  const [more, setMore] = useState(false);
  const [page, setPage] = useState(1);

  const [last, setLast] = useState(true);

  const fetchMyTrash = async () => {
    await Api.get(`/trash/users/${userIdtoRedux}/pages/${page}`, {
      headers: {
        Authorization: `${what.value}`,
      },
    }).then((res) => {
      if (res.data) {
        const newArray = trashes ? [...trashes, ...res.data] : res.data;
        setTrashes(newArray);
      } else {
        setLast(false);
      }
    });
  };

  const changePage = () => {
    if (!more) return setMore(true);
    return setPage(page + 1);
  };

  useEffect(() => {
    if (what !== "") {
      fetchMyTrash();
    }
  }, [page]);

  useEffect(() => {}, [trashes]);

  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
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
      </Box>
      <Container
        style={{
          borderRadius: 8,
          backgroundColor: "white",
        }}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          {trashes && Object.keys(trashes)?.length === 0 ? (
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
                paddingTop: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {trashes &&
                Object.values(trashes)?.map((item: rs.Trash, index: any) => (
                  <MultiActionAreaCard
                    image={item.img}
                    kind={item.trash_kind}
                    key={index}
                  />
                ))}
            </Box>
          )}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ margin: 5 }}
          >
            {last === true ? (
              <Button
                onClick={changePage}
                style={{ color: "#76F2BE", fontFamily: "Itim" }}
              >
                more
                <MoreIcon />
              </Button>
            ) : (
              <Box style={{ color: "#76F2BE", fontFamily: "Itim" }}>
                no more data!
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default MyTrashcan;
