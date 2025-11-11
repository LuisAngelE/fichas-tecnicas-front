import "./App.css";
import AuthState from "./context/Auth/AuthState";
import CategoriasState from "./context/Categorias/CategoriasState";
import FichasTecnicasState from "./context/FichasTecnicas/FichasTecnicasState";
import ModelosState from "./context/Modelos/ModelosState";
import SegmentosState from "./context/Segmentos/SegmentosState";
import SubCategoriasState from "./context/Subcategorías/SubCategoriasState";
import AppRouter from "./routes/AppRouter";

function AdminApp() {
  return (
    <FichasTecnicasState>
      <ModelosState>
        <SegmentosState>
          <SubCategoriasState>
            <CategoriasState>
              <AuthState>
                <AppRouter />
              </AuthState>
            </CategoriasState>
          </SubCategoriasState>
        </SegmentosState>
      </ModelosState>
    </FichasTecnicasState>
  );
}

export default AdminApp;
