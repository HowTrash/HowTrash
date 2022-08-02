import { Button, Typography, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import Api from "../../utils/customApi";
import { ReduxModule } from "../../modules/ReduxModule";
import { getAccess } from "src/Auth/tokenManager";
import { useDispatch } from "react-redux";
import { save_ID } from "../../actions/ImgIDActions";
import lottie from "lottie-web";

const LoadingLottie = () => {
  //lottie
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../images/LottieLoading.json"),
    });
  }, []);
  return <Box ref={element} style={{ marginTop: 60, height: 230 }}></Box>;
};

function UploadImage() {
  const [isImg, setIsImg] = useState(null);
  const [urlImg, setUrlImg] = useState("");
  const [respondImg, setRespondImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userIdtoRedux = ReduxModule().decodeInfo?.id;
  console.log(userIdtoRedux, "in uploadImage");

  const resizeFile = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500, // max width
        250, // max height
        "JPEG",
        513, // min width
        0, // min height
        (uri) => {
          resolve(uri);
        },
        "file" // 저장 형식
      );
    });

  const dispatch = useDispatch();

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file: any =
        event.target.files instanceof FileList ? event.target.files[0] : null;

      setRespondImg(file);

      const img: any = await resizeFile(file);
      setIsImg(img);
      setUrlImg(URL.createObjectURL(img));
      console.log("success upload image!");
    } catch (err) {
      console.log(err);
    }
  };
  const what: any = getAccess();

  const sendImage: () => Promise<any> = async () => {
    const trashFormData = new FormData();
    trashFormData.append("filename", respondImg as any);

    await Api.post(`/trash/users/${userIdtoRedux}/results`, trashFormData, {
      headers: {
        Authorization: `${what.value}`,
      },
    })

      .then((res) => {
        dispatch(save_ID(res.data.image_id));
        //res.data.challenge : NONE 확인해야함
        navigate(`/howtopage`);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        navigate(`/errorpage`);
      });
  };

  const onClickImgResult = () => {
    if (isImg === null) return alert("no image");
    else {
      setLoading(true);
      sendImage();
    }
  };
  if (loading)
    return (
      <div>
        <LoadingLottie />
        <Typography
          sx={{ fontFamily: "Nanum1", mt: 2, fontSize: 20, fontWeight: "bold" }}
        >
          결과 분석 중 ..
        </Typography>
      </div>
    );

  return (
    <Box>
      <form>
        <Button
          variant="outlined"
          sx={{
            borderColor: "white",
            borderRadius: 3,
            boxShadow: "1px 3px 3px #B0B09A",
            backgroundColor: "white",
            width: 600,
            height: 300,
            mt: 5,
            "&:hover": {
              backgroundColor: "#D4D4D4",
              borderColor: "#F7F8E9",
            },
            "& .MuiTouchRipple-root span": {
              backgroundColor: "#8F704E",
              opacity: 0.3,
            },
          }}
          component="label"
        >
          <img src={urlImg}></img>
          <input
            type="file"
            hidden
            required
            onChange={(e) => onChangeImage(e)}
          />
          {isImg ? null : (
            <Box>
              {" "}
              <CloudUploadIcon sx={{ color: "#B8B8B8" }} fontSize="large" />
              <Typography sx={{ color: "#759F98" }}>
                {" "}
                Upload your image!
              </Typography>
            </Box>
          )}
        </Button>
        <Box>
          <Button
            onClick={onClickImgResult}
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "#51523E",
              },
              mt: 2,
              width: 80,
              height: 30,
              fontWeight: "bold",
              fontSize: 12,
              mb: 2,
              color: "white",
              backgroundColor: "#737458",
            }}
          >
            결과보기
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default UploadImage;
