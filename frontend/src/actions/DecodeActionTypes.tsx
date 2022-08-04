export const DECODE_SUCCESS = "DECODE_SUCCESS";
export const DECODE_FAIL = "DECODE_FAIL";

export type DecodePropsType = {
  id: string;
  alias: string;
};

export interface decodeFailDispatch {
  type: typeof DECODE_FAIL;
}

export interface decodeSucccessDispatch {
  type: typeof DECODE_SUCCESS;
  payload: DecodePropsType;
}

export type DecodeDispatchType = decodeFailDispatch | decodeSucccessDispatch;
