import { GET_ALL_SUBCATEGORIAS, SHOW_ERRORS_API } from "../../types";

const SubCategoriasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_SUBCATEGORIAS:
      return {
        ...state,
        subcategorias: action.payload,
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

export default SubCategoriasReducer;

