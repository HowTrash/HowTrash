import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Page/Login";
import MyPage from "./Page/MyPage";
import MainPage from "./Page/MainPage";
import Header from "./component/Header";
import Register from "./Page/Register";
import Howto from "./Page/Howto";

import GreenBack from "./images/greenBack";
import MyTrashcan from "./component/Mypage/MyTrashcan";
import MyTrashChart from "./component/Mypage/MyTrashChart";
import MyChallenge from "./component/Mypage/MyChallenge";
import ChangeInfo from "./component/Mypage/ChangeInfo";
import UploadResult from "./component/mainpage/UploadResult";

function IsLogin(access_token: any) {
  const [login, setLogin] = useState(false);
  console.log("왜 안됨?");

  useEffect(() => {
    if (localStorage.getItem(access_token) !== null) {
      console.log("로그인 on", setLogin);
    } else {
      setLogin(false);
      console.log("로그인 off", setLogin);
    }
  }, []);

  return login;
}

function App() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          float: "right",
          zIndex: -100,
          top: 0,
          right: 0,
        }}
      >
        <GreenBack />
      </div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/howto" element={<Howto />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mainpage/resultpage" element={<UploadResult />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route index element={<MyTrashcan />} />
            <Route path="/mypage/myTrashChart" element={<MyTrashChart />} />
            <Route path="/mypage/myChallenge" element={<MyChallenge />} />
            <Route path="/mypage/userInfo" element={<ChangeInfo />} />
            <Route path="/mypage/logout" element={<MyTrashcan />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
