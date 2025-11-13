import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import AuthContext from "../context/Auth/AuthContext";
import { Grid } from "@mui/material";
import LoadingComponent from "../components/loading/LoadingComponent";
import AdminRoutes from "./AdminRoutes";
import ViewerRoutes from "./ViewerRoutes";

const AppRouter = () => {
  const { autenticado, usuarioAutenticado, cargando, loginExterno, errorAuth } =
    useContext(AuthContext);

  const location = window.location;
  const params = new URLSearchParams(location.search);
  const employeeNumber = params.get("employee_number");

  useEffect(() => {
    if (employeeNumber) {
      loginExterno(employeeNumber);
    } else {
      usuarioAutenticado();
    }
  }, []);

  if (cargando) {
    return (
      <Grid item xs={12}>
        <LoadingComponent />
      </Grid>
    );
  }

  if (!autenticado && errorAuth) {
    window.location.href = "https://ldrhsys.ldrhumanresources.com/";
    return null;
  }

  const user_type = localStorage.getItem("user_type");
  let PrivateComponent = null;

  if (user_type === "1") PrivateComponent = AdminRoutes;
  if (user_type === "2") PrivateComponent = ViewerRoutes;

  return (
    <Router>
      <Switch>
        {autenticado && PrivateComponent && (
          <Redirect exact from="/" to="/Inicio" />
        )}

        {PrivateComponent && (
          <PrivateRouter
            path="/"
            component={PrivateComponent}
            isAuthenticated={autenticado}
          />
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
