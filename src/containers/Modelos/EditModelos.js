import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import MethodGet from "../../config/service";
import { Grid, MenuItem } from "@mui/material";
import SegmentosContext from "../../context/Segmentos/SegmentosContext";
import ModelosContext from "../../context/Modelos/ModelosContext";

export default function EditModelos({ open, handleClose, id }) {
  const { segmentos, GetSegmentos } = useContext(SegmentosContext);
  const { UpdateModelos } = useContext(ModelosContext);
  const [modelo, saveModelo] = useState(null);
  useEffect(() => {
    let url = `/models/${id}`;
    MethodGet(url)
      .then((res) => {
        saveModelo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    GetSegmentos();
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    data.id = id;
    UpdateModelos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar modelo</DialogTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
          }
        }}
      >
        <DialogContent>
          {modelo && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nombre del modelo"
                  defaultValue={modelo.name}
                  {...register("name", {
                    required: "El nombre del modelo es obligatorio",
                    minLength: { value: 1, message: "Mínimo 1 caracteres" },
                    maxLength: { value: 200, message: "Máximo 200 caracteres" },
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Descripción del modelo"
                  defaultValue={modelo.description}
                  multiline
                  rows={4}
                  {...register("description", {
                    minLength: { value: 1, message: "Mínimo 1 caracteres" },
                    maxLength: { value: 500, message: "Máximo 500 caracteres" },
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  select
                  fullWidth
                  label="Selecciona un segemento"
                  defaultValue={modelo.segment_id}
                  {...register("segment_id", {
                    required: "Debes seleccionar un segmento",
                  })}
                  error={!!errors.segment_id}
                  helperText={errors.segment_id?.message}
                >
                  <MenuItem value="">
                    <em>-- Selecciona un segemento --</em>
                  </MenuItem>
                  {segmentos.map((segmento) => (
                    <MenuItem key={segmento.id} value={segmento.id}>
                      {segmento.name}
                    </MenuItem>
                  ))}
                </TextField>
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
