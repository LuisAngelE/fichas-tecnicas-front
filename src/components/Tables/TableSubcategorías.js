import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import SubCategoriasContext from "../../context/Subcategorías/SubCategoriasContext";
import { motion, AnimatePresence } from "framer-motion";
import EditSubcategorías from "../../containers/Subcategorías/EditSubcategorías";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C0D4FC",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainerResponsive = styled(TableContainer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& thead": {
      display: "none",
    },
    "& tbody tr": {
      display: "block",
      marginBottom: "15px",
    },
    "& td": {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 5px",
      borderBottom: "1px solid #000000ff",
      "&:before": {
        content: "attr(data-label)",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
      "&:last-child": {
        borderBottom: 0,
      },
    },
  },
}));

export default function TableSubcategorías({ subcategorias }) {
  const { DeleteSubCategorias } = useContext(SubCategoriasContext);
  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_service, saveIdService] = useState(null);
  const handleClickOpen = (id) => {
    OpenModalUpdate(true);
    saveIdService(id);
  };
  const handleClickClose = () => {
    OpenModalUpdate(false);
    saveIdService(null);
  };
  return (
    <>
      <TableContainerResponsive component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="tabla de categorias">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Categoría</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {subcategorias.length > 0 ? (
                subcategorias.map((subcategoria) => (
                  <StyledTableRow
                    key={subcategoria.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#C0D4FC" }}
                  >
                    <StyledTableCell data-label="ID">
                      {subcategoria.id}
                    </StyledTableCell>
                    <StyledTableCell data-label="Nombre">
                      {subcategoria.name}
                    </StyledTableCell>
                    <StyledTableCell data-label="Categoría">
                      {subcategoria.category.name}
                    </StyledTableCell>
                    <StyledTableCell data-label="Acciones">
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen(subcategoria.id)}
                      >
                        <Tooltip title="Editar categoria" placement="top">
                          <EditIcon
                            sx={{
                              color: "#e7a62f",
                              transition: "0.2s",
                              "&:hover": { rotate: "30deg" },
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => DeleteSubCategorias(subcategoria.id)}
                      >
                        <Tooltip title="Eliminar categoria" placement="top">
                          <DeleteIcon
                            sx={{
                              color: "#FF0000",
                              transition: "0.2s",
                              "&:hover": { scale: "2" },
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay subcategorías disponibles
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
        {id_service !== null && (
          <EditSubcategorías
            open={modalUpdate}
            handleClose={handleClickClose}
            id={id_service}
          />
        )}
      </TableContainerResponsive>
    </>
  );
}
