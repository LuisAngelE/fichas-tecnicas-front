import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import AuthContext from "../context/Auth/AuthContext";
import { Grid, Typography } from "@mui/material";
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
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Typography variant="body2" color="textSecondary">
          {errorAuth}
        </Typography>
      </Grid>
    );
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

        {!autenticado && (
          <Route
            exact
            path="/"
            render={() => (
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                style={{ marginTop: "20px" }}
              >
                No estás autenticado.
              </Typography>
            )}
          />
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
