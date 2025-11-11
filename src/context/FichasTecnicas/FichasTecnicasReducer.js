import { GET_ALL_FICHAS_TECNICAS, SHOW_ERRORS_API } from "../../types";

const FichasTecnicasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_FICHAS_TECNICAS:
      return {
        ...state,
        fichastecnicas: action.payload,
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

export default FichasTecnicasReducer;
