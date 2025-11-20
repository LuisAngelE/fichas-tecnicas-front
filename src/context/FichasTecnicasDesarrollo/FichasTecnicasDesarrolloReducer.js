import {
  GET_ALL_FICHAS_TECNICAS_DESARROLLO,
  SHOW_ERRORS_API,
} from "../../types";

const FichasTecnicasDesarrolloReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_FICHAS_TECNICAS_DESARROLLO:
      return {
        ...state,
        fichastecnicasdesarrollos: action.payload,
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

export default FichasTecnicasDesarrolloReducer;
