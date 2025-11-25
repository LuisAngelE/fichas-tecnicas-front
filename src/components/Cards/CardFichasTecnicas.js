import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.25 } },
};

const CardFichasTecnicas = ({ fichastecnicas = [] }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "");

  const handleOpenPDF = (ficha) => {
    const cleanUrl =
      process.env.REACT_APP_BACKEND_URL?.replace("/api", "") || "";
    window.open(`${cleanUrl}/storage/${ficha.file_path}`, "_blank");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {fichastecnicas.length > 0 ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {fichastecnicas.map((ficha) => (
              <Grid
                item
                key={ficha.id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
                component={motion.div}
                variants={cardVariants}
                layout
              >
                <Card
                  component={motion.div}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0px 12px 28px rgba(0,0,0,0.18)",
                    transition: { duration: 0.28 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  sx={{
                    width: 280,
                    height: 380,
                    borderRadius: 4,
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #ffffff, #f3f4f7)",
                    border: "1px solid #e5e7eb",
                    transition: "0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 700,
                        letterSpacing: 0.6,
                      }}
                    >
                      FICHA TÉCNICA
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        mb: 0.6,
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={ficha.model?.name}
                    >
                      {ficha.model?.name || "Modelo desconocido"}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mb: 1.2, color: "text.secondary" }}
                    >
                      Versión: <strong>{ficha.version || "v1.0"}</strong>
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "text.secondary",
                      }}
                      title={ficha.file_name}
                    >
                      📄 {ficha.file_name}
                    </Typography>

                    <Divider sx={{ my: 1.5 }} />

                    <Box
                      sx={{
                        width: "100%",
                        height: 130,
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eceff1",
                      }}
                    >
                      <img
                        src={
                          ficha?.image?.url ??
                          `${baseUrl}/storage/fichas/imagenes/default.webp`
                        }
                        alt="imagen ficha"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "0.3s",
                        }}
                      />
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<PictureAsPdfIcon />}
                      onClick={() => handleOpenPDF(ficha)}
                      component={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        py: 1,
                      }}
                    >
                      Ver PDF
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
        >
          No hay fichas técnicas disponibles.
        </Typography>
      )}
    </Box>
  );
};

export default CardFichasTecnicas;
