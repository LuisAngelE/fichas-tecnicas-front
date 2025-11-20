import React, { useReducer } from "react";
import FichasTecnicasDesarrolloContext from "./FichasTecnicasDesarrolloContext";
import FichasTecnicasDesarrolloReducer from "./FichasTecnicasDesarrolloReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_FICHAS_TECNICAS_DESARROLLO,
  ADD_FICHAS_TECNICAS_DESARROLLO,
  UPDATE_FICHAS_TECNICAS_DESARROLLO,
  DELETE_FICHAS_TECNICAS_DESARROLLO,
} from "../../types";

const FichasTecnicasDesarrolloState = ({ children }) => {
  const initialState = {
    fichastecnicasdesarrollos: [],
    fichastecnicasdesarrollo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(
    FichasTecnicasDesarrolloReducer,
    initialState
  );

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

  const GetFichasTecnicasDesarrollo = async (
    search = "",
    model_id = "",
    segment_id = "",
    subcategory_id = "",
    category_id = ""
  ) => {
    try {
      let url = "/technical-sheets/development";

      const params = new URLSearchParams();

      if (search.trim()) params.append("search", search);
      if (model_id) params.append("model_id", model_id);
      if (segment_id) params.append("segment_id", segment_id);
      if (subcategory_id) params.append("subcategory_id", subcategory_id);
      if (category_id) params.append("category_id", category_id);

      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const res = await MethodGet(url);
      dispatch({
        type: GET_ALL_FICHAS_TECNICAS_DESARROLLO,
        payload: res.data.data,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const AddFichasTecnicasDesarrolo = (data) => {
    MethodPost("/technical-sheets", data)
      .then((res) => {
        dispatch({ type: ADD_FICHAS_TECNICAS_DESARROLLO, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Ficha técnica agregado con éxito",
          icon: "success",
        });
        GetFichasTecnicasDesarrollo();
      })
      .catch(handleError);
  };

  const UpdateFichasTecnicasDesarrollo = (data) => {
    const id = data.get ? data.get("id") : data.id;

    const request =
      data instanceof FormData
        ? MethodPost(`/technical-sheets/${id}?_method=PUT`, data)
        : MethodPut(`/technical-sheets/${id}`, data);

    request
      .then((res) => {
        dispatch({
          type: UPDATE_FICHAS_TECNICAS_DESARROLLO,
          payload: res.data,
        });
        Swal.fire({
          title: "Éxito",
          text: "Ficha técnica actualizada con éxito",
          icon: "success",
        });
        GetFichasTecnicasDesarrollo();
      })
      .catch(handleError);
  };

  const DeleteFichasTecnicasDesarrollo = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La ficha técnica seleccionada será eliminada",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/technical-sheets/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_FICHAS_TECNICAS_DESARROLLO, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetFichasTecnicasDesarrollo();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <FichasTecnicasDesarrolloContext.Provider
      value={{
        fichastecnicasdesarrollos: state.fichastecnicasdesarrollos,
        fichastecnicasdesarrollo: state.fichastecnicasdesarrollo,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetFichasTecnicasDesarrollo,
        AddFichasTecnicasDesarrolo,
        UpdateFichasTecnicasDesarrollo,
        DeleteFichasTecnicasDesarrollo,
      }}
    >
      {children}
    </FichasTecnicasDesarrolloContext.Provider>
  );
};

export default FichasTecnicasDesarrolloState;
