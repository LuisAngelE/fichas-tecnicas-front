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
import SubCategoriasContext from "../../context/Subcategorías/SubCategoriasContext";
import SegmentosContext from "../../context/Segmentos/SegmentosContext";

export default function EditSegmentos({ open, handleClose, id }) {
  const { subcategorias, GetSubCategories } = useContext(SubCategoriasContext);
  const { UpdateSegmentos } = useContext(SegmentosContext);
  const [segmento, saveSegmento] = useState(null);
  useEffect(() => {
    let url = `/segments/${id}`;
    MethodGet(url)
      .then((res) => {
        saveSegmento(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    GetSubCategories();
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    data.id = id;
    UpdateSegmentos(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar segmento</DialogTitle>
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
          {segmento && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nombre del segmento"
                  defaultValue={segmento.name}
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
                  defaultValue={segmento.subcategory_id}
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
