import jwtDecode, { JwtPayload } from "jwt-decode";
import { DecodePropsType } from "../actions/DecodeActionTypes";
// 해더에 사용할 닉네임을 위해 받아온 token 디코드

interface jwtType {
  alias: string;
  email: string;
  exp: string;
  name: string;
  type: string;
}
const decodeToken = (accessToken: string) => {
  console.log("잘 들어왔나?", accessToken);
  const decoded = jwtDecode<jwtType>(accessToken); // Returns with the JwtPayload type
  console.log("라이브러리로?", decoded);
  console.log("데이터 요소 값 : ", decoded.alias);
  return decoded;
};

export { decodeToken };
