import React, { useReducer } from "react";
import SegmentosContext from "./SegmentosContext";
import SegmentosReducer from "./SegmentosReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_SEGMENTOS,
  ADD_SEGMENTOS,
  UPDATE_SEGMENTOS,
  DELETE_SEGMENTOS,
} from "../../types";

const SegmentosState = ({ children }) => {
  const initialState = {
    segmentos: [],
    segmento: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(SegmentosReducer, initialState);

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

  const GetSegmentos = () => {
    MethodGet("/segments")
      .then((res) => {
        dispatch({
          type: GET_ALL_SEGMENTOS,
          payload: res.data.data,
        });
      })
      .catch(handleError);
  };

  const AddSegmentos = (data) => {
    MethodPost("/segments", data)
      .then((res) => {
        dispatch({ type: ADD_SEGMENTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Categoría agregada con éxito",
          icon: "success",
        });
        GetSegmentos();
      })
      .catch(handleError);
  };

  const UpdateSegmentos = (data) => {
    MethodPut(`/segments/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_SEGMENTOS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Categoría actualizada con éxito",
          icon: "success",
        });
        GetSegmentos();
      })
      .catch(handleError);
  };

  const DeleteSegmentos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La categoría seleccionada será eliminada",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/segments/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_SEGMENTOS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetSegmentos();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <SegmentosContext.Provider
      value={{
        segmentos: state.segmentos,
        segmento: state.segmento,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetSegmentos,
        AddSegmentos,
        UpdateSegmentos,
        DeleteSegmentos,
      }}
    >
      {children}
    </SegmentosContext.Provider>
  );
};

export default SegmentosState;
