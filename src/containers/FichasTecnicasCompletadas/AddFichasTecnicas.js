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
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import FichasTecnicasContext from "../../context/FichasTecnicas/FichasTecnicasContext";

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

export default function AddFichasTecnicas({ modal, handleClose, modelos }) {
  const { AddFichasTecnicas } = useContext(FichasTecnicasContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIMG, setSelectedIMG] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (!selectedFile) {
      alert("Debes seleccionar un archivo PDF");
      return;
    }

    if (!selectedIMG) {
      alert("Debes seleccionar una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("model_id", data.model_id);
    formData.append("status", data.status);
    formData.append("version", data.version || "");
    formData.append("file", selectedFile);
    formData.append("image", selectedIMG);

    AddFichasTecnicas(formData);
    handleClose();
    reset();
    setSelectedFile(null);
    setSelectedIMG(null);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={modal}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Agregar ficha técnica
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
                select
                fullWidth
                label="Selecciona un modelo"
                defaultValue=""
                {...register("model_id", {
                  required: "Debes seleccionar un modelo",
                })}
                error={!!errors.model_id}
                helperText={errors.model_id?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona un modelo --</em>
                </MenuItem>
                {modelos.map((modelo) => (
                  <MenuItem key={modelo.id} value={modelo.id}>
                    {modelo.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Versión (opcional)"
                variant="outlined"
                {...register("version", {
                  maxLength: {
                    value: 50,
                    message: "La versión no puede tener más de 50 caracteres",
                  },
                })}
                error={!!errors.version}
                helperText={errors.version?.message}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                select
                fullWidth
                label="Estatus de la ficha técnica"
                defaultValue=""
                {...register("status", {
                  required: "Selecciona un estatus",
                })}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="">
                  <em>-- Selecciona --</em>
                </MenuItem>
                <MenuItem value="2">Completada</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Archivo PDF
              </Typography>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "6px",
                  width: "100%",
                }}
              />
              {selectedFile && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Archivo seleccionado: {selectedFile.name}
                </Typography>
              )}
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Selecciona una imagen
              </Typography>
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/gif"
                onChange={(e) => setSelectedIMG(e.target.files[0])}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "6px",
                  width: "100%",
                }}
              />
              {selectedIMG && (
                <img
                  src={URL.createObjectURL(selectedIMG)}
                  alt="Preview"
                  style={{ marginTop: 10, width: "100%", borderRadius: 8 }}
                />
              )}
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
            Agregar ficha técnica
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
}
