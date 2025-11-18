import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import LayersIcon from "@mui/icons-material/Layers";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DescriptionIcon from "@mui/icons-material/Description";
import TableChartIcon from "@mui/icons-material/TableChart";
import { motion } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";

const cardsData = [
  {
    title: "Categorías",
    subtitle: "Gestiona y organiza las categorías principales del sistema.",
    icon: <CategoryIcon sx={{ fontSize: 48, color: "#4A6FA5" }} />,
    link: "/Categorías",
    bgColor: "#E9F1FF",
  },
  {
    title: "Subcategorías",
    subtitle: "Administra subniveles para un control más detallado.",
    icon: <LayersIcon sx={{ fontSize: 48, color: "#4A6FA5" }} />,
    link: "/Subcategorías",
    bgColor: "#FFF4E2",
  },
  {
    title: "Segmentos",
    subtitle: "Clasifica los segmentos para una mejor organización.",
    icon: <ViewModuleIcon sx={{ fontSize: 48, color: "#4A6FA5" }} />,
    link: "/Segmentos",
    bgColor: "#EAF8EF",
  },
  {
    title: "Modelos",
    subtitle: "Registra y administra los modelos disponibles.",
    icon: <DirectionsCarIcon sx={{ fontSize: 48, color: "#4A6FA5" }} />,
    link: "/Modelos",
    bgColor: "#FFE9F0",
  },
  {
    title: "Tabla de Fichas Técnicas",
    subtitle: "Crea nuevas fichas técnicas y adjunta documentos PDF.  ",
    icon: <TableChartIcon sx={{ fontSize: 48, color: "#4A6FA5" }} />,
    link: "/Tabla-fichas-tecnicas",
    bgColor: "#F3E9FF",
  },
  {
    title: "Fichas Técnicas",
    subtitle: "Consulta, filtra y administra todas las fichas técnicas.",
    icon: <DescriptionIcon sx={{ fontSize: 48, color: "#4A6FA5" }} />,
    link: "/Fichas-tecnicas",
    bgColor: "#E3F5FF",
  },
];

const Inicio = () => {
  const { usuario } = useContext(AuthContext);
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) setSaludo("Buenos días");
    else if (hora >= 12 && hora < 18) setSaludo("Buenas tardes");
    else setSaludo("Buenas noches");
  }, []);

  const nombreCompleto = [
    usuario?.first_name,
    usuario?.middle_name,
    usuario?.last_name,
    usuario?.second_last_name,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Layout>
      <Grid container spacing={2} sx={{ px: 2 }}>
        <Grid size={12}>
          <Typography
            align="center"
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "#2c3e50", mb: 4 }}
          >
            Hola, {saludo}, {nombreCompleto}.
            <br />
            <br />
            Bienvenido(a) a la Plataforma de Fichas Técnicas.
          </Typography>
        </Grid>
        <Grid size={12}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to={card.link} style={{ textDecoration: "none" }}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    backgroundColor: card.bgColor,
                    minHeight: 210,
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 1.5,
                    }}
                  >
                    {card.icon}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#2c3e50" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#4b4b4b", maxWidth: 220 }}
                    >
                      {card.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Inicio;
