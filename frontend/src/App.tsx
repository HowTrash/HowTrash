import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getToken } from "./Auth/tokenManager";
import Login from "./Page/Login";
import MyPage from "./Page/MyPage";
import MainPage from "./Page/MainPage";
import Header from "./components/Header";
import Register from "./Page/Register";
import Howto from "./Page/Howto";

import GreenBack from "./images/greenBack";
import MyTrashcan from "./components/Mypage/MyTrashcan";
import MyTrashChart from "./components/Mypage/MyTrashChart";
import MyChallenge from "./components/Mypage/MyChallenge";
import ChangeInfo from "./components/Mypage/ChangeInfo";
import UploadResult from "./components/mainpage/UploadResult";

import AuthRouter from "./Auth/AuthRouter";

function App() {
  useEffect(() => {
    getToken();
  }, []);

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
          {/* mypage 에 접근 못하게 라우팅 */}
          <Route element={<AuthRouter />}>
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<MyTrashcan />} />
              <Route path="/mypage/myTrashChart" element={<MyTrashChart />} />
              <Route path="/mypage/myChallenge" element={<MyChallenge />} />
              <Route path="/mypage/userInfo" element={<ChangeInfo />} />
              <Route path="/mypage/logout" element={<MyTrashcan />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;