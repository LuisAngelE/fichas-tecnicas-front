import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import NoResultados from "../components/layout/NoResultados";
import FichasTecnicas from "../containers/FichasTecnicas/FichasTecnicas";
import FichasTecnicasCompletadas from "../containers/FichasTecnicasCompletadas/FichasTecnicasCompletadas";

const GerenteRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route
        exact
        path="/fichas-tecnicas-completadas"
        component={FichasTecnicasCompletadas}
      />
      <Route exact path="/Fichas-tecnicas" component={FichasTecnicas} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default GerenteRoutes;
