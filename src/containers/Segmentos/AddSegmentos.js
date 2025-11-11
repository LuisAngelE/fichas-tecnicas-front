import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import SubCategoriasContext from "../../context/Subcategorías/SubCategoriasContext";
import SegmentosContext from "../../context/Segmentos/SegmentosContext";
import { motion } from "framer-motion";
import { useContext } from "react";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddSegmentos({ modal, handleClose }) {
  const { subcategorias, GetSubCategories } = useContext(SubCategoriasContext);
  const { AddSegmentos } = useContext(SegmentosContext);

  useEffect(() => {
    GetSubCategories();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    AddSegmentos(data);
    handleClose();
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={modal}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Agregar segmento
      </BootstrapDialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter")
            e.preventDefault();
        }}
      >
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Nombre del segmento"
                {...register("name", {
                  required: "El nombre del segmento es obligatorio",
                  minLength: { value: 1, message: "Mínimo 1 caracteres" },
                  maxLength: { value: 200, message: "Máximo 200 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Selecciona una subcategoría"
                defaultValue=""
                {...register("subcategory_id", {
                  required: "Debes seleccionar una subcategoría",
                })}
                error={!!errors.subcategory_id}
                helperText={errors.subcategory_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona una subcategoría --</em>
                </MenuItem>
                {subcategorias.map((subcategoria) => (
                  <MenuItem key={subcategoria.id} value={subcategoria.id}>
                    {subcategoria.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            type="submit"
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
            whileTap={{ scale: 0.9 }}
          >
            Agregar segmento
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
