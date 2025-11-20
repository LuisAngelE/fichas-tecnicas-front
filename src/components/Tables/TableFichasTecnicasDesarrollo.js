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
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditFichasTecnicas from "../../containers/FichasTecnicasDesarrollo/EditFichasTecnicas";
import FichasTecnicasDesarrolloContext from "../../context/FichasTecnicasDesarrollo/FichasTecnicasDesarrolloContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C0D4FC",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    textAlign: "center",
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
      borderBottom: "1px solid #000",
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

export default function TableFichasTecnicasDesarrollo({
  fichastecnicasdesarrollos,
}) {
  const baseUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/api$/, "");
  const { DeleteFichasTecnicasDesarrollo } = useContext(
    FichasTecnicasDesarrolloContext
  );
  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_service, saveIdService] = useState(null);
  const user_type = localStorage.getItem("user_type");

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
        <Table aria-label="tabla de fichas técnicas">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Imagen</StyledTableCell>
              <StyledTableCell>Nombre del archivo PDF</StyledTableCell>
              <StyledTableCell>Versión</StyledTableCell>
              <StyledTableCell>Ver PDF</StyledTableCell>
              <StyledTableCell>Creador</StyledTableCell>
              <StyledTableCell>Modelo</StyledTableCell>
              <StyledTableCell>Segmento</StyledTableCell>
              <StyledTableCell>Subcategoría</StyledTableCell>
              <StyledTableCell>Categoría</StyledTableCell>
              <StyledTableCell>Fecha de creación</StyledTableCell>
              <StyledTableCell>Fecha de actualización</StyledTableCell>
              {user_type === "1" && <StyledTableCell>Acciones</StyledTableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence>
              {fichastecnicasdesarrollos &&
              fichastecnicasdesarrollos.length > 0 ? (
                fichastecnicasdesarrollos.map((fichastecnicasdesarrollo) => (
                  <StyledTableRow
                    key={fichastecnicasdesarrollo.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#E3ECFF" }}
                  >
                    <StyledTableCell data-label="ID">
                      {fichastecnicasdesarrollo.id}
                    </StyledTableCell>

                    <StyledTableCell data-label="Imagen">
                      <img
                        src={
                          fichastecnicasdesarrollo?.image?.url ??
                          `${baseUrl}/storage/fichas/imagenes/default.webp`
                        }
                        alt="imagen ficha"
                        width="60"
                        style={{ borderRadius: "5px" }}
                      />
                    </StyledTableCell>

                    <StyledTableCell data-label="Nombre del archivo">
                      {fichastecnicasdesarrollo.file_name}
                    </StyledTableCell>

                    <StyledTableCell data-label="Versión">
                      {fichastecnicasdesarrollo.version}
                    </StyledTableCell>

                    <StyledTableCell data-label="Ver PDF">
                      <Tooltip title="Ver ficha técnica" placement="top">
                        <a
                          href={`${baseUrl}/storage/${fichastecnicasdesarrollo.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "red",
                            fontWeight: "bold",
                          }}
                        >
                          Ver PDF
                        </a>
                      </Tooltip>
                    </StyledTableCell>

                    <StyledTableCell data-label="Creador">
                      {fichastecnicasdesarrollo.user
                        ? `${fichastecnicasdesarrollo.user.first_name ?? ""} ${
                            fichastecnicasdesarrollo.user.middle_name ?? ""
                          } ${fichastecnicasdesarrollo.user.last_name ?? ""} ${
                            fichastecnicasdesarrollo.user.second_last_name ?? ""
                          }`.trim()
                        : "Sin creador"}
                    </StyledTableCell>

                    <StyledTableCell data-label="Modelo">
                      {fichastecnicasdesarrollo.model?.name || "Sin modelo"}
                    </StyledTableCell>

                    <StyledTableCell data-label="Segmento">
                      {fichastecnicasdesarrollo.model?.segment?.name ||
                        "Sin segmento"}
                    </StyledTableCell>

                    <StyledTableCell data-label="Subcategoría">
                      {fichastecnicasdesarrollo.model?.segment?.subcategory
                        ?.name || "Sin subcategoría"}
                    </StyledTableCell>

                    <StyledTableCell data-label="Categoría">
                      {fichastecnicasdesarrollo.model?.segment?.subcategory
                        ?.category?.name || "Sin categoría"}
                    </StyledTableCell>

                    <StyledTableCell data-label="Fecha de creación">
                      {new Date(fichastecnicasdesarrollo.created_at)
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " ")}
                    </StyledTableCell>

                    <StyledTableCell data-label="Fecha de actualización">
                      {new Date(fichastecnicasdesarrollo.updated_at)
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " ")}
                    </StyledTableCell>

                    {user_type === "1" && (
                      <StyledTableCell data-label="Acciones">
                        <Tooltip title="Editar ficha técnica" placement="top">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleClickOpen(fichastecnicasdesarrollo.id)
                            }
                          >
                            <EditIcon
                              sx={{
                                color: "#e7a62f",
                                transition: "0.2s",
                                "&:hover": { rotate: "30deg" },
                              }}
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar ficha técnica" placement="top">
                          <IconButton
                            size="small"
                            onClick={() =>
                              DeleteFichasTecnicasDesarrollo(
                                fichastecnicasdesarrollo.id
                              )
                            }
                          >
                            <DeleteIcon
                              sx={{
                                color: "#FF0000",
                                transition: "0.2s",
                                "&:hover": { scale: "1.2" },
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    No hay fichas técnicas disponibles
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>

        {id_service !== null && (
          <EditFichasTecnicas
            open={modalUpdate}
            handleClose={handleClickClose}
            id={id_service}
          />
        )}
      </TableContainerResponsive>
    </>
  );
}
