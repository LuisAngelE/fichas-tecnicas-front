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

  const [fichastecnica, setFichaTecnica] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIMG, setSelectedIMG] = useState(null);

  useEffect(() => {
    GetModelos();
  }, []);

  useEffect(() => {
    if (!id) return;

    let url = `/technical-sheets/${id}`;
    MethodGet(url)
      .then((res) => {
        setFichaTecnica(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("model_id", data.model_id);
    formData.append("version", data.version || "");
    formData.append("status", data.status);
    formData.append("id", id);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    if (selectedIMG) {
      formData.append("image", selectedIMG);
    }

    UpdateFichasTecnicas(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Editar ficha técnica</DialogTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (["Enter", "NumpadEnter"].includes(e.code)) e.preventDefault();
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
                  {...register("version", {
                    maxLength: {
                      value: 50,
                      message: "Máximo 50 caracteres",
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
                  defaultValue={fichastecnica.status}
                  {...register("status", {
                    required: "Selecciona un estatus",
                  })}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="">
                    <em>-- Selecciona --</em>
                  </MenuItem>
                  <MenuItem value="1">En Desarrollo</MenuItem>
                  <MenuItem value="2">Completada</MenuItem>
                </TextField>
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

                <Typography sx={{ mt: 1 }} variant="body2">
                  {selectedFile
                    ? `Archivo nuevo: ${selectedFile.name}`
                    : `Archivo actual: ${fichastecnica.file_name}`}
                </Typography>
              </Grid>

              <Grid size={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Reemplazar imagen (opcional)
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

                <div style={{ marginTop: 10 }}>
                  {selectedIMG ? (
                    <img
                      src={URL.createObjectURL(selectedIMG)}
                      alt="Preview"
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  ) : fichastecnica.image ? (
                    <img
                      src={fichastecnica.image.url}
                      alt="Imagen actual"
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  ) : (
                    <Typography>No hay imagen</Typography>
                  )}
                </div>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "red", color: "white" }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            sx={{
              backgroundColor: "#1565c0",
              color: "white",
            }}
          >
            Actualizar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
