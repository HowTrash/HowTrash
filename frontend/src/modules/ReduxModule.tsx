import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../index";
import { fetchDecodeData } from "src/actions/DecodeActions";
import { useEffect } from "react";

function ReduxModule() {
  const token = localStorage.getItem("access_token");

  const dispatch = useDispatch();

  const reduxToken = useSelector(
    (state: RootReducerType) => state.DecodeReducer
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchDecodeData(token as string));
    } else {
      alert("잘못된 접근입니다.");
    }
  }, []);

  return reduxToken;
}

export { ReduxModule };
