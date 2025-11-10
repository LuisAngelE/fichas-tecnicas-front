import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost } from "../../config/service";
import tokenAuth from "../../config/TokenAuth";

import { OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR } from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    usuario: {},
    User: {},
    user_me: null,
    cargando: true,
    success: false,
    errorAuth: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const usuarioAutenticado = async (datos) => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    MethodGet("/user")
      .then(({ data }) => {
        localStorage.setItem("user_type", data.user_type);
        localStorage.setItem("user_id", data.id);
        dispatch({
          type: OBTENER_USUARIO,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
        });
      });
  };

  const loginExterno = async (employee_number) => {
    try {
      const { data } = await MethodPost(`/login/${employee_number}`);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: data,
      });

      localStorage.setItem("token", data.token);

      await usuarioAutenticado();
    } catch (error) {
      console.error("Error al autenticar externamente:", error);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        user_me: state.user_me,
        success: state.success,
        cargando: state.cargando,
        errorAuth: state.errorAuth,
        usuarioAutenticado,
        loginExterno,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
