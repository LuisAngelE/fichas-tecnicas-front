import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import FichasTecnicasContext from "../../context/FichasTecnicas/FichasTecnicasContext";
import ModelosContext from "../../context/Modelos/ModelosContext";
import SegmentosContext from "../../context/Segmentos/SegmentosContext";
import SubCategoriasContext from "../../context/Subcategorías/SubCategoriasContext";
import CategoriasContext from "../../context/Categorias/CategoriasContext";
import CardFichasTecnicas from "../../components/Cards/CardFichasTecnicas";

const Inicio = () => {
  const { modelos, GetModelos } = useContext(ModelosContext);
  const { segmentos, GetSegmentos } = useContext(SegmentosContext);
  const { categorias, GetCategories } = useContext(CategoriasContext);
  const { subcategorias, GetSubCategories } = useContext(SubCategoriasContext);

  const { fichastecnicas, GetFichasTecnicas } = useContext(
    FichasTecnicasContext
  );

  const [searchNombre, setSearchNombre] = useState("");
  const [searchModelo, setSearcModelo] = useState("");
  const [searchSegmento, setSearchSegmento] = useState("");
  const [searchSubcategorias, setSearchSubcategorias] = useState("");
  const [searchCategorias, setSearchCategorias] = useState("");

  useEffect(() => {
    GetFichasTecnicas(
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
            Fichas técnicas
          </Typography>
        </Grid>
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
          </Box>
        </Grid>
        <Grid size={12}>
          <CardFichasTecnicas fichastecnicas={fichastecnicas} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Inicio;
