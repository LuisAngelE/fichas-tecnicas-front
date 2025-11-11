import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Button, Grid, Typography } from "@mui/material";
import SegmentosContext from "../../context/Segmentos/SegmentosContext";
import AddSegmentos from "./AddSegmentos";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import TableSegmentos from "../../components/Tables/TableSegmentos";

const Segmentos = () => {
  const { segmentos, GetSegmentos } = useContext(SegmentosContext);
  
  useEffect(() => {
    GetSegmentos();
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
            Segmentos
          </Typography>
        </Grid>
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
        <Grid size={12}>
          <TableSegmentos segmentos={segmentos} />
        </Grid>
      </Grid>

      <AddSegmentos modal={openModal} handleClose={handleClose} />
    </Layout>
  );
};

export default Segmentos;
