import {
  DecodePropsType,
  DECODE_FAIL,
  DECODE_SUCCESS,
  DecodeDispatchType,
} from "../actions/DecodeActionTypes";

interface DecodeState {
  success: boolean;
  decodeInfo?: DecodePropsType;
}

const decodeState: DecodeState = {
  success: false,
};

const DecodeReducer = (
  state = decodeState,
  action: DecodeDispatchType
): DecodeState => {
  switch (action.type) {
    case DECODE_FAIL:
      return {
        ...state,
        success: false,
      };
    case DECODE_SUCCESS:
      const { id, alias } = action.payload;
      return {
        ...state,
        success: true,
        decodeInfo: {
          id,
          alias,
        },
      };

    default:
      return state;
  }
};

export default DecodeReducer;
