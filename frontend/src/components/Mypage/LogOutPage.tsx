import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Typography,
    Container,
    Box,
    Button,
    Link
} from "@mui/material";
import lottie from "lottie-web";

const theme = createTheme({
    palette: {
        primary: {
            main: "#737458",
        },
    },
});

const btnstyle = {
    backgroundColor: "#B0B09A",
    color: "#ffffff",
    marginTop: "25px",
    fontSize: "15px",
    textDecoration: "none",
    borderRadius: 4,
    p: 1,
    fontFamily: "Itim",
    "&:hover": { backgroundColor: "#737458", color: "#ffffff" },
};

const Lottie = () => {
    const element = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        lottie.loadAnimation({
            container: element.current as HTMLDivElement,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: require("../../images/LogLottie.json"),
        });
    }, []);
    return <Box ref={element} style={{ height: 300 }}></Box>;
};


function LogOut() {
    function deleteToken() {
        localStorage.clear();
    }

    return (
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor: "transparent",
                minWidth: "100%",
                marginTop: 20,
            }}
        >
            <ThemeProvider theme={theme}>
                <Typography
                    color="black"
                    fontWeight="bold"
                    sx={{ mt: 1.2, mb: 1, fontSize: "medium" }}
                >

                </Typography>
                <Container
                    style={{
                        borderRadius: 8,
                        backgroundColor: "white",
                        boxShadow: "1px 3px 3px #B0B09A",
                    }}
                    sx={{ mt: 5, mb: 3, pb: 5 }}
                >
                    <Container
                        style={{
                            border: "solid",
                            borderRadius: 5,
                            borderColor: "transparent",
                            minWidth: "100%",
                            height: "auto",
                        }}
                    >

                        <Container
                            style={{
                                backgroundColor: "white",
                                border: "solid",
                                borderRadius: 5,
                                borderColor: "white",
                                justifyContent: "center",
                                height: "auto",
                                paddingTop: 30,
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                id="modal-title"
                                variant="h4"
                                fontWeight="bold"
                                component="h1"
                                sx={{ textAlign: "center", mb: 3, mt: 5, color: "#737458", fontFamily: "Itim", }}
                            >
                                로그아웃 하시겠습니까?
                            </Typography>
                            <div style={{ marginTop: 25 }}>
                                <Lottie />
                            </div>
                            <Container sx={{alignItems:"center", justifyContent:"center"}}>
                                <Link href="/mainpage" onClick={deleteToken} sx={btnstyle}>
                                    Log Out
                                </Link>
                            </Container>
                        </Container>
                    </Container>
                </Container>
            </ThemeProvider>
        </Container >
    );
}

export default LogOut;
