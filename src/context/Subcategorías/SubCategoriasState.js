import React, { useReducer } from "react";
import SubCategoriasContext from "./SubCategoriasContext";
import SubCategoriasReducer from "./SubCategoriasReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_SUBCATEGORIAS,
  ADD_SUBCATEGORIAS,
  UPDATE_SUBCATEGORIAS,
  DELETE_SUBCATEGORIAS,
} from "../../types";

const SubCategoriasState = ({ children }) => {
  const initialState = {
    subcategorias: [],
    subcategoria: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(SubCategoriasReducer, initialState);

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

  const GetSubCategories = () => {
    MethodGet("/subcategories")
      .then((res) => {
        dispatch({
          type: GET_ALL_SUBCATEGORIAS,
          payload: res.data,
        });
      })
      .catch(handleError);
  };

  const AddSubCategorias = (data) => {
    MethodPost("/subcategories", data)
      .then((res) => {
        dispatch({ type: ADD_SUBCATEGORIAS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Subcategoría agregada con éxito",
          icon: "success",
        });
        GetSubCategories();
      })
      .catch(handleError);
  };

  const UpdateSubCategorias = (data) => {
    MethodPut(`/subcategories/${data.id}`, data)
      .then((res) => {
        dispatch({ type: UPDATE_SUBCATEGORIAS, payload: res.data });
        Swal.fire({
          title: "Éxito",
          text: "Subcategoría actualizada con éxito",
          icon: "success",
        });
        GetSubCategories();
      })
      .catch(handleError);
  };

  const DeleteSubCategorias = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La subcategoría seleccionada será eliminada",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/subcategories/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_SUBCATEGORIAS, payload: id });
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetSubCategories();
          })
          .catch(handleError);
      }
    });
  };

  return (
    <SubCategoriasContext.Provider
      value={{
        subcategorias: state.subcategorias,
        subcategoria: state.subcategoria,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetSubCategories,
        AddSubCategorias,
        UpdateSubCategorias,
        DeleteSubCategorias,
      }}
    >
      {children}
    </SubCategoriasContext.Provider>
  );
};

export default SubCategoriasState;
