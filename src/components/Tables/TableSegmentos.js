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
import SegmentosContext from "../../context/Segmentos/SegmentosContext";
import { motion, AnimatePresence } from "framer-motion";
import EditSegmentos from "../../containers/Segmentos/EditSegmentos";

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

export default function TableSegmentos({ segmentos }) {
  const { DeleteSegmentos } = useContext(SegmentosContext);
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
        <Table aria-label="tabla de segmentos">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>SubCategoría</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {segmentos.length > 0 ? (
                segmentos.map((segmento) => (
                  <StyledTableRow
                    key={segmento.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#C0D4FC" }}
                  >
                    <StyledTableCell data-label="ID">
                      {segmento.id}
                    </StyledTableCell>
                    <StyledTableCell data-label="Nombre">
                      {segmento.name}
                    </StyledTableCell>
                    <StyledTableCell data-label="SubCategoría">
                      {segmento.subcategory.name}
                    </StyledTableCell>
                    <StyledTableCell data-label="Acciones">
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen(segmento.id)}
                      >
                        <Tooltip title="Editar segmento" placement="top">
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
                        onClick={() => DeleteSegmentos(segmento.id)}
                      >
                        <Tooltip title="Eliminar segmento" placement="top">
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
                    No hay segmentos disponibles
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
        {id_service !== null && (
          <EditSegmentos
            open={modalUpdate}
            handleClose={handleClickClose}
            id={id_service}
          />
        )}
      </TableContainerResponsive>
    </>
  );
}
