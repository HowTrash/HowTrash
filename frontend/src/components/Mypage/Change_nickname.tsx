import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { rs } from "src/utils/types";
import { API_BASE_URL } from "src/utils/constants";
import { getToken } from "../../Auth/tokenManager";
import { setAccessToken, setRefreshToken } from "src/Auth/tokenManager";
import { useState } from "react";
import Api from "../../utils/customApi";

import {
    Typography,
    Container,
    styled,
    TextField,
    Box,
    Link,
    Button
} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#759F98",
        },
    },
});

const UserInfoChange = styled(TextField)(({ }) => ({
    "&:hover": {
        color: "#759F98",
    },
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#759F98",
        },
    },
}));


function ChangeNickName() {
    const aliasRegex = /^[가-힣a-zA-Z]+$/;
    const [checkAilas, setCheckAlias] = useState("");
    const [alias, setAlias] = useState("");
    const [aliasError, setAliasError] = useState("");

    const onBlurInfo = async (props: Array<string>, event: any) => {
        const res = await Api.get(
            `/users/?case=${props[0]}&value=${props[1] as string}`
        );
        if (props[0] == "alias") {
            if (!aliasRegex.test(alias as string) || (alias as string).length < 1) {
                setAliasError("올바른 닉네임을 입력해주세요.");
            } else {
                setAliasError("");
                if (res.data.result == false) setCheckAlias("사용 중인 닉네임 입니다.");
                else setCheckAlias("사용 가능한 닉네임 입니다.");
            }
        }
    }; // 닉네임 유효성 체크


    const handleSubmit = (e: any) => {
        const data = new FormData(e.currentTarget);
        const changeAlias = data.get("alias");
        if (aliasRegex.test(changeAlias as string) && checkAilas === "사용 가능한 닉네임 입니다.") { // 닉네임 체크에 통과될 때
            const aliasChange = async () => {
                const stringAccess = getToken().access;
                console.log("이거슨 토큰?", stringAccess);
        
                if (stringAccess !== null) { // stringAccess if문 안써주면 코드 오류 발생
                    const access: rs.TokenInfo = JSON.parse(stringAccess); // string형태로 받는 토큰 JSON으로 만들어줌
                    console.log("넘겨줄 토큰값", access);
        
                    const changeData = await axios
                        .patch(`${API_BASE_URL}/users/`, { "value": { "alias": changeAlias } }, { //patch : 바디 -> 변경할 alias & 헤더 -> 확인해야되는 토큰 
                            headers: {
                                Authorization: `${access.value}`,
                            },
                        })
                        .then((response) => {
                            console.log("response", response.data);
                            setAccessToken(response.data.access_token, true); // 그 전의 access토큰 초기화
                            setRefreshToken(response.data.refresh_token, true); // 그 전의 refresh토큰 초기화
                            alert("닉네임이 정상적으로 변경되었습니다!");
                        })
                        .catch((e) => { // 의도치 않는 오류
                            alert("로그인 정보에 오류가 생겼습니다. 새로고침을 해주세요");
                        });
                };
            }
            aliasChange();
        }
        else  e.preventDefault();
        //오류 생길때는 활성화 X 화면 넘어가지 않도록
    }



    return (
        <Container
            style={{
                border: "solid",
                borderRadius: 5,
                borderColor: "transparent",
                minWidth: "100%",
                height: "100vh",
            }}>
            <ThemeProvider theme={theme}>
                <Typography
                    color="black"
                    fontWeight="bold"
                    sx={{
                        mt: 1.2,
                        mb: 1,
                        fontSize: "medium"
                    }}>
                    닉네임 변경
                </Typography>

                <Container
                    style={{
                        backgroundColor: "white",
                        border: "solid",
                        borderRadius: 5,
                        borderColor: "white",
                        justifyContent: "center",
                        height: "100vh",
                        paddingTop: 50
                    }}>

                    <Box
                        component="form"
                        color="info.contrastText"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 300,
                            margin: "auto"
                        }}

                    >
                        <UserInfoChange
                            margin="normal"
                            required
                            fullWidth
                            name="alias"
                            label="변경할 닉네임 입력"
                            type="alias"
                            id="alias"
                            autoComplete="current-nickname"
                            onChange={(e) => setAlias(e.target.value)}
                            onBlur={(event) => {
                                onBlurInfo(["alias", alias], event);
                            }}
                        />
                        <span
                            style={{
                                color: "red",
                                fontSize: 13,
                                marginLeft: 8,
                            }}
                        >
                            {checkAilas}
                        </span>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                height: 50,
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            변경하기
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </Container>

    );
}

export default ChangeNickName;
