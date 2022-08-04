import { combineReducers } from "redux";
import DecodeReducer from "./DecodeReducer";
import ImgIDReducer from "./ImgIDReducer";

const rootReducer = combineReducers({
  DecodeReducer,
  ImgIDReducer,
});

export default rootReducer;
