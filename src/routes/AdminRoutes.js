import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import Perfil from "../containers/Perfil/Perfil";
import NoResultados from "../components/layout/NoResultados";
import Categorías from "../containers/Categorías/Categorías";
import Subcategorías from "../containers/Subcategorías/Subcategorías";
import Segmentos from "../containers/Segmentos/Segmentos";
import Modelos from "../containers/Modelos/Modelos";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/Categorías" component={Categorías} />
      <Route exact path="/Subcategorías" component={Subcategorías} />
      <Route exact path="/Segmentos" component={Segmentos} />
      <Route exact path="/Modelos" component={Modelos} />
      <Route exact path="/Perfil" component={Perfil} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default AdminRoutes;
