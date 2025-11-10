import { GET_ALL_SEGMENTOS, SHOW_ERRORS_API } from "../../types";

const SegmentosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_SEGMENTOS:
      return {
        ...state,
        segmentos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case SHOW_ERRORS_API:
      return {
        ...state,
        ErrorsApi: action.payload,
      };
    default:
      return state;
  }
};

export default SegmentosReducer;
