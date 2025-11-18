import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import NoResultados from "../components/layout/NoResultados";
import TableFichasTecnicas from "../containers/TableFichasTecnicas/TableFichasTecnicas";
import FichasTecnicas from "../containers/FichasTecnicas/FichasTecnicas";

const ViewerRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/Fichas-tecnicas" component={FichasTecnicas} />
      <Route
        exact
        path="/Tabla-fichas-tecnicas"
        component={TableFichasTecnicas}
      />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default ViewerRoutes;
