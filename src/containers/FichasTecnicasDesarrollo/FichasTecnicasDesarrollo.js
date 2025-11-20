import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import ModelosContext from "../../context/Modelos/ModelosContext";
import SegmentosContext from "../../context/Segmentos/SegmentosContext";
import SubCategoriasContext from "../../context/Subcategorías/SubCategoriasContext";
import CategoriasContext from "../../context/Categorias/CategoriasContext";
import AddFichasTecnicas from "../FichasTecnicasDesarrollo/AddFichasTecnicas";
import TableFichasTecnicasDesarrollo from "../../components/Tables/TableFichasTecnicasDesarrollo";
import FichasTecnicasDesarrolloContext from "../../context/FichasTecnicasDesarrollo/FichasTecnicasDesarrolloContext";

const FichasTecnicasDesarrollo = () => {
  const user_type = localStorage.getItem("user_type");
  const { modelos, GetModelos } = useContext(ModelosContext);
  const { segmentos, GetSegmentos } = useContext(SegmentosContext);
  const { categorias, GetCategories } = useContext(CategoriasContext);
  const { subcategorias, GetSubCategories } = useContext(SubCategoriasContext);

  const { fichastecnicasdesarrollos, GetFichasTecnicasDesarrollo } = useContext(
    FichasTecnicasDesarrolloContext
  );

  const [searchNombre, setSearchNombre] = useState("");
  const [searchModelo, setSearcModelo] = useState("");
  const [searchSegmento, setSearchSegmento] = useState("");
  const [searchSubcategorias, setSearchSubcategorias] = useState("");
  const [searchCategorias, setSearchCategorias] = useState("");

  useEffect(() => {
    GetFichasTecnicasDesarrollo(
      searchNombre,
      searchModelo,
      searchSegmento,
      searchSubcategorias,
      searchCategorias
    );
  }, [
    searchNombre,
    searchModelo,
    searchSegmento,
    searchSubcategorias,
    searchCategorias,
  ]);

  useEffect(() => {
    GetModelos();
    GetSegmentos();
    GetCategories();
    GetSubCategories();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid size={8}>
          <Typography
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "black" }}
          >
            Fichas técnicas en desarrollo
          </Typography>
        </Grid>
        {user_type === "1" && (
          <Grid size={4}>
            <Button
              onClick={handleClickOpen}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#C0D4FC",
                color: "black",
                "&:hover": {
                  bgcolor: "#C0D4FC",
                  boxShadow: 3,
                  transform: "scale(1.05)",
                },
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
              }}
              component={motion.button}
              whileTap={{ scale: 0.95 }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Agregar
            </Button>
          </Grid>
        )}
        <Grid size={12}>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            sx={{
              "& > *": {
                flex: "1 1 200px",
              },
            }}
          >
            <TextField
              label="Filtrar por nombre"
              variant="outlined"
              size="small"
              fullWidth
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
            />
            <TextField
              select
              label="Categorías"
              value={searchCategorias}
              onChange={(e) => setSearchCategorias(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="">Filtrar por tipo de categoría</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Subcategorías"
              value={searchSubcategorias}
              onChange={(e) => setSearchSubcategorias(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="">Filtrar por tipo de subcategoría</MenuItem>
              {subcategorias.map((subcategoria) => (
                <MenuItem key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Segmentos"
              value={searchSegmento}
              onChange={(e) => setSearchSegmento(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="">Filtrar por tipo de segmento</MenuItem>
              {segmentos.map((segmento) => (
                <MenuItem key={segmento.id} value={segmento.id}>
                  {segmento.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Modelos"
              value={searchModelo}
              onChange={(e) => setSearcModelo(e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="">Filtrar por tipo de modelo</MenuItem>
              {modelos.map((modelo) => (
                <MenuItem key={modelo.id} value={modelo.id}>
                  {modelo.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid size={12}>
          <TableFichasTecnicasDesarrollo
            fichastecnicasdesarrollos={fichastecnicasdesarrollos}
          />
        </Grid>
      </Grid>

      <AddFichasTecnicas
        modal={openModal}
        handleClose={handleClose}
        modelos={modelos}
      />
    </Layout>
  );
};

export default FichasTecnicasDesarrollo;
