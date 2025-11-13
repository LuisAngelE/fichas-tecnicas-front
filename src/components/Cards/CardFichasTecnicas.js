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
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.25 } },
};

const CardFichasTecnicas = ({ fichastecnicas = [] }) => {
  const handleOpenPDF = (ficha) => {
    const baseUrl =
      process.env.REACT_APP_BACKEND_URL?.replace("/api", "") || "";
    window.open(`${baseUrl}/storage/${ficha.file_path}`, "_blank");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {fichastecnicas.length > 0 ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
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
                    scale: 1.03,
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    width: 280,
                    height: 260,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)",
                    border: "1px solid #eee",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: 4,
                      padding: "2px",
                      background:
                        "linear-gradient(45deg, #007bff, #00c6ff, #007bff)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      animation: "gradientMove 4s linear infinite",
                      zIndex: 0,
                    },
                    "@keyframes gradientMove": {
                      "0%": { backgroundPosition: "0% 50%" },
                      "100%": { backgroundPosition: "100% 50%" },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 2.5,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        letterSpacing: 0.5,
                      }}
                    >
                      FICHA TÉCNICA
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "primary.main",
                        mb: 0.8,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={ficha.model?.name || "Modelo desconocido"}
                    >
                      {ficha.model?.name || "Modelo desconocido"}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: 1,
                      }}
                    >
                      Versión:{" "}
                      <Typography component="span" sx={{ fontWeight: 500 }}>
                        {ficha.version || "v1.0"}
                      </Typography>
                    </Typography>

                    <Divider sx={{ my: 1.2 }} />

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
                  </CardContent>

                  <CardActions
                    sx={{ p: 2, pt: 0, position: "relative", zIndex: 1 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      fullWidth
                      startIcon={<PictureAsPdfIcon />}
                      onClick={() => handleOpenPDF(ficha)}
                      component={motion.button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
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
