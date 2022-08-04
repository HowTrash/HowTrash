import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import {
  DecodeDispatchType,
  DecodePropsType,
  DECODE_SUCCESS,
  DECODE_FAIL,
} from "./DecodeActionTypes";

interface jwtType {
  alias: string;
  exp: string;
  id: string;
  type: string;
}

export const fetchDecodeData =
  (accessToken: string) => (dispatch: Dispatch<DecodeDispatchType>) => {
    if (accessToken) {
      const decoded = jwtDecode<jwtType>(accessToken);

      const data: DecodePropsType = {
        id: decoded.id,
        alias: decoded.alias,
      };

      dispatch({
        type: DECODE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: DECODE_FAIL,
      });
    }
  };
