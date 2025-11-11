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
import CategoriasContext from "../../context/Categorias/CategoriasContext";

export default function EditSubcategorías({ open, handleClose, id }) {
  const { categorias, GetCategories } = useContext(CategoriasContext);
  const { UpdateSubCategorias } = useContext(SubCategoriasContext);
  const [subcategoria, saveSubCategoria] = useState(null);
  useEffect(() => {
    let url = `/subcategories/${id}`;
    MethodGet(url)
      .then((res) => {
        saveSubCategoria(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    GetCategories();
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    data.id = id;
    UpdateSubCategorias(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar subcategoria</DialogTitle>
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
          {subcategoria && (
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Nombre de la subcategoría"
                  defaultValue={subcategoria.name}
                  {...register("name", {
                    required: "El nombre dela subcategoría es obligatorio",
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
                  label="Selecciona una categoría"
                  defaultValue={subcategoria.category_id}
                  {...register("category_id", {
                    required: "Debes seleccionar una categoría",
                  })}
                  error={!!errors.category_id}
                  helperText={errors.category_id?.message}
                >
                  <MenuItem value="">
                    <em>-- Selecciona una categoría --</em>
                  </MenuItem>
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.name}
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
