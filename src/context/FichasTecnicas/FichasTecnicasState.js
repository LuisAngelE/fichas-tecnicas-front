import React, { useReducer } from "react";
import FichasTecnicasContext from "./FichasTecnicasContext";
import FichasTecnicasReducer from "./FichasTecnicasReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import { GET_ALL_FICHAS_TECNICAS } from "../../types";

const FichasTecnicasState = ({ children }) => {
  const initialState = {
    fichastecnicas: [],
    fichastecnica: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(FichasTecnicasReducer, initialState);

  const handleError = (error) => {
    const data = error.response?.data;

    if (data?.errors) {
      const mensajes = Object.values(data.errors).flat().join("\n");
      Swal.fire({
        title: "Error de validación",
        icon: "warning",
        text: mensajes,
      });
    } else if (data?.mensaje) {
      Swal.fire({
        title: data.error || "Error",
        icon: "error",
        text: data.mensaje,
      });
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Ocurrió un error inesperado",
      });
    }
  };

  const GetFichasTecnicas = () => {
    MethodGet("/technical-sheets")
      .then((res) => {
        dispatch({
          type: GET_ALL_FICHAS_TECNICAS,
          payload: res.data.data,
        });
      })
      .catch(handleError);
  };

  return (
    <FichasTecnicasContext.Provider
      value={{
        fichastecnicas: state.fichastecnicas,
        fichastecnica: state.fichastecnica,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetFichasTecnicas,
      }}
    >
      {children}
    </FichasTecnicasContext.Provider>
  );
};

export default FichasTecnicasState;
