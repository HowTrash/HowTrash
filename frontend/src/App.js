import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Page/Login";
import MyPage from "./Page/MyPage";
import MainPage from "./Page/MainPage";
import Header from "./component/Header";
import Register from "./Page/Register";

import {ReactComponent as GreenBack } from './images/greenBack.svg'

function App() {
    return (
        <div>
            {/* <div style={{position: 'absolute',float: "right", zIndex: -100, top: 0, right: 0}}>
                <GreenBack />
            </div> */}
            <Router>
            <Header />
                <Routes>
                <Route path=" " element={<MainPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
