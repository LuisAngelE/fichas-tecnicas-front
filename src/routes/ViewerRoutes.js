import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import Perfil from "../containers/Perfil/Perfil";
import NoResultados from "../components/layout/NoResultados";

const ViewerRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/Perfil" component={Perfil} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default ViewerRoutes;
