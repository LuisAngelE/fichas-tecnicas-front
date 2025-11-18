import React from "react";
import Layout from "./Layout";
import Noresultados from "./gif/404.gif";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";

const NoResultados = () => {
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Toolbar />
        <Grid item>
          <Box
            component="img"
            src={Noresultados}
            alt="No se encontraron resultados"
            sx={{
              maxWidth: "200px",
              width: "100%",
              borderRadius: 2,
              mb: 3,
            }}
          />
        </Grid>

        <Typography variant="h6" sx={{ mb: 2 }}>
          No se encontraron resultados
        </Typography>

        <Link to="/Inicio" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#546B85",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                backgroundColor: "#546B85",
              },
            }}
          >
            Regresar al inicio
          </Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default NoResultados;
