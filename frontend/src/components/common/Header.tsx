import { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Link,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../../index";
import { fetchDecodeData } from "src/actions/DecodeActions";
import Logo from "../../images/header/headerLogo";

const sidebarNavItems = [
  {
    display: "내 분리수거함",
    to: "/mypage",
  },
  {
    display: "내 쓰레기 통계",
    to: "/mypage/myTrashChart",
  },
  {
    display: "도전! 재활용",
    to: "/mypage/myChallenge",
  },
  {
    display: "내 정보 변경",
    to: "/mypage/userInfo",
  },
  {
    display: "로그아웃",
    to: "/mypage/logout",
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#737458",
    },
  },
});

function Header() {
  const token = localStorage.getItem("access_token");

  const dispatch = useDispatch();

  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchDecodeData(token as string));
    } else {
      console.log("header.js not token");
    }
  }, []);

  function deleteToken() {
    localStorage.clear();
  }

  //============Mypage List============
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any, index: any, option: any) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    navigate(option.to);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        style={{
          backgroundColor: "#737458",
          width: "100%",
          maxWidth: "1920px",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          marginLeft="auto"
        >
          <Link
            href="/mainpage"
            sx={{
              position: "absolute",
              left: 60,
              textDecoration: "none",
              paddingBottom: 1,
              paddingTop: 1,
            }}
          >
            <Logo />
          </Link>

          {token ? (
            // if IsLogin is true
            <div>
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <Button>
                  <List component="nav">
                    <ListItem
                      button
                      aria-haspopup="listbox"
                      aria-controls="lock-menu"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClickListItem}
                      style={{
                        fontFamily: "Itim",
                        color: "#F7F8E9",
                        fontSize: 16,
                      }}
                    >
                      mypage
                    </ListItem>
                  </List>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "lock-button",
                      role: "listbox",
                    }}
                    style={{ paddingTop: 0 }}
                  >
                    {sidebarNavItems.map((option, index) => (
                      <MenuItem
                        key={option.display}
                        selected={index === selectedIndex}
                        onClick={(event) =>
                          handleMenuItemClick(event, index, option)
                        }
                        style={{
                          backgroundColor: "#B0B09A",
                          color: "#F7F8E9",
                          fontSize: 12,
                        }}
                      >
                        {option.display}
                      </MenuItem>
                    ))}
                  </Menu>
                </Button>
              </div>
              <Button>
                <Link
                  href="/mainpage"
                  onClick={deleteToken}
                  sx={{
                    textDecoration: "none",
                    color: "#F7F8E9",
                    fontSize: "small",
                    fontFamily: "Itim",
                    margin: 1,
                  }}
                >
                  {reduxToken.decodeInfo?.alias}
                </Link>
              </Button>
            </div>
          ) : (
            // if IsLogin is false
            <Button>
              <Link
                href="/login"
                sx={{
                  textDecoration: "none",
                  fontFamily: "Itim",
                  color: "#F7F8E9",
                  margin: 1,
                  fontSize: 17,
                  fontStyle: "bold",
                }}
              >
                Login
              </Link>
            </Button>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Header;
