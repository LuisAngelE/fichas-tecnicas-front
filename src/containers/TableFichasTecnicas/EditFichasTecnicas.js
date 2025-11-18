import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import MethodGet from "../../config/service";
import ModelosContext from "../../context/Modelos/ModelosContext";
import FichasTecnicasContext from "../../context/FichasTecnicas/FichasTecnicasContext";

export default function EditFichasTecnicas({ open, handleClose, id }) {
  const { modelos, GetModelos } = useContext(ModelosContext);
  const { UpdateFichasTecnicas } = useContext(FichasTecnicasContext);
  const [fichastecnica, saveFichaTecnica] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    let url = `/technical-sheets/${id}`;
    MethodGet(url)
      .then((res) => {
        saveFichaTecnica(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    GetModelos();
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("model_id", data.model_id);
    formData.append("version", data.version || "");
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("id", id);
    UpdateFichasTecnicas(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar ficha técnica</DialogTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter")
            e.preventDefault();
        }}
      >
        <DialogContent>
          {fichastecnica && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Selecciona un modelo"
                  defaultValue={fichastecnica.model_id || ""}
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
                  defaultValue={fichastecnica.version || ""}
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
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Reemplazar archivo PDF (opcional)
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
                {selectedFile ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Archivo seleccionado: {selectedFile.name}
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Archivo actual: {fichastecnica.file_name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
              "&:hover": { backgroundColor: "#0d47a1" },
            }}
          >
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
