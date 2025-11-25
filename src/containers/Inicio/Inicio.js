import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";

import CategoryIcon from "@mui/icons-material/Category";
import LayersIcon from "@mui/icons-material/Layers";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Inicio = () => {
  const user_type = localStorage.getItem("user_type");
  const { usuario } = useContext(AuthContext);
  const [saludo, setSaludo] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    setSaludo(
      hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches"
    );
  }, []);

  const cardsData = [
    {
      title: "Categorías",
      subtitle: "Gestiona y organiza las categorías principales del sistema.",
      icon: <CategoryIcon />,
      color: "#1A73E8",
      gradient: "linear-gradient(135deg, #1A73E8, #4285F4)",
      link: "/Categorías",
    },
    {
      title: "Subcategorías",
      subtitle: "Administra subniveles para un control más detallado.",
      icon: <LayersIcon />,
      color: "#E67E22",
      gradient: "linear-gradient(135deg, #E67E22, #F39C12)",
      link: "/Subcategorías",
    },
    {
      title: "Segmentos",
      subtitle: "Clasifica los segmentos para una mejor organización.",
      icon: <ViewModuleIcon />,
      color: "#27AE60",
      gradient: "linear-gradient(135deg, #27AE60, #2ECC71)",
      link: "/Segmentos",
    },
    {
      title: "Modelos",
      subtitle: "Registra y administra los modelos disponibles.",
      icon: <DirectionsCarIcon />,
      color: "#C0392B",
      gradient: "linear-gradient(135deg, #C0392B, #E74C3C)",
      link: "/Modelos",
    },
    {
      title: "Fichas Técnicas en Desarrollo",
      subtitle: "Revisa las fichas técnicas en desarrollo.",
      icon: <PendingActionsIcon />,
      color: "#8E44AD",
      gradient: "linear-gradient(135deg, #8E44AD, #9B59B6)",
      link: "/fichas-tecnicas-desarrollo",
    },
    {
      title: "Fichas Técnicas Completadas",
      subtitle: "Consulta fichas finalizadas y descarga PDF.",
      icon: <AssignmentTurnedInIcon />,
      color: "#16A085",
      gradient: "linear-gradient(135deg, #16A085, #1ABC9C)",
      link: "/fichas-tecnicas-completadas",
    },
    {
      title: "Fichas Técnicas",
      subtitle: "Consulta y administra todas las fichas técnicas.",
      icon: <DescriptionIcon />,
      color: "#34495E",
      gradient: "linear-gradient(135deg, #34495E, #2C3E50)",
      link: "/Fichas-tecnicas",
    },
  ];

  const CARDS_BY_ROLE = {
    1: [0, 1, 2, 3, 4, 5, 6], // Admin
    2: [5, 6], // Viewer
    3: [4, 5, 6], // Director
    4: [5, 6], // Gerente
  };

  const filteredCards = (CARDS_BY_ROLE[user_type] ?? []).map(
    (i) => cardsData[i]
  );

  const nombreCompleto = usuario
    ? [
        usuario.first_name,
        usuario.middle_name,
        usuario.last_name,
        usuario.second_last_name,
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  const baseCardStyles = {
    width: 330,
    height: 260,
    borderRadius: 4,
    p: 1,
    cursor: "pointer",
    backdropFilter: "blur(12px) saturate(160%)",
    background: "rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.35s ease",
  };

  const motionVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.06, y: -6 },
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          px: 2,
          py: 4,
          background: "linear-gradient(145deg, #eef2f3, #dfe9f3)",
        }}
      >
        <Typography
          align="center"
          fontWeight="bold"
          variant="h5"
          sx={{
            mb: 5,
            color: "#2c3e50",
            fontFamily: "monospace",
          }}
        >
          Hola {saludo}, {nombreCompleto}. <br />
          Bienvenido(a) a la Plataforma de Fichas Técnicas.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {filteredCards.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <Link to={card.link} style={{ textDecoration: "none" }}>
                <Card
                  component={motion.div}
                  variants={motionVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.25 }}
                  sx={{
                    ...baseCardStyles,
                    "&:hover": {
                      background: card.gradient,
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 2,

                      "& svg": {
                        fontSize: 52,
                        color: card.color,
                        transition: "all 0.35s ease",
                      },

                      "&:hover svg": {
                        color: "white",
                        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9))",
                      },

                      ".title": {
                        fontWeight: "bold",
                        color: "#1f2937",
                        transition: "all 0.35s ease",
                      },
                      ".subtitle": {
                        color: "#4b5563",
                        transition: "all 0.35s ease",
                      },

                      "&:hover .title, &:hover .subtitle": {
                        color: "white",
                        textShadow: "0 0 4px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <Box>{card.icon}</Box>

                    <Typography variant="h6" className="title">
                      {card.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="subtitle"
                      sx={{ maxWidth: 240 }}
                    >
                      {card.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Inicio;
