import * as React from "react";
import {
  Box,
  SwipeableDrawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Logo from "../layout/img/FOTON.png";
import CategoryIcon from "@mui/icons-material/Category";
import { blue } from "@mui/material/colors";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext } from "react";
import Noresultados from "./gif/404.gif";

export default function NoResultados() {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const user_type = localStorage.getItem("user_type");

  const Admin = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    { name: "Categorías", value: "/Categorías", icon: <CategoryIcon /> },
    { name: "Subcategorías", value: "/Subcategorías", icon: <LayersIcon /> },
    { name: "Segmentos", value: "/Segmentos", icon: <ViewModuleIcon /> },
    { name: "Modelos", value: "/Modelos", icon: <DevicesOtherIcon /> },
    {
      name: "Fichas técnicas",
      value: "/Fichas-tecnicas",
      icon: <DescriptionIcon />,
    },
  ];

  const Viewer = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    {
      name: "Fichas técnicas",
      value: "/Fichas-tecnicas",
      icon: <DescriptionIcon />,
    },
  ];

  const menuItems = user_type === "1" ? Admin : user_type === "2" ? Viewer : [];

  const inicial = usuario?.first_name
    ? usuario.first_name.charAt(0).toUpperCase()
    : "U";

  const nombreCompleto = usuario
    ? `${usuario.first_name ?? ""} ${usuario.middle_name ?? ""} ${
        usuario.last_name ?? ""
      } ${usuario.second_last_name ?? ""}`.trim()
    : "Usuario";

  const list = () => (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
          }}
        >
          <Avatar sx={{ bgcolor: blue[300], width: 56, height: 56 }}>
            {inicial}
          </Avatar>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            {nombreCompleto}
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={item.value}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              sx={{ color: "#000000ff" }}
              onClick={() => cerrarSesion()}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: "#C0D4FC" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{
              color: "black",
              transition: "0.2s",
              zIndex: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="logo" style={{ width: 80, height: 80 }} />
          </Box>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Toolbar />

        <Grid item>
          <Box
            component="img"
            src={Noresultados}
            alt="No se encontraron resultados"
            sx={{
              maxWidth: "400px",
              width: "100%",
              borderRadius: 2,
              mb: 3,
            }}
          />
        </Grid>

        <Typography variant="h6" sx={{ mb: 2 }}>
          No se encontraron resultados
        </Typography>

        <Link to="/Inicio" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C0D4FC",
              color: "black",
              fontWeight: "bold",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                backgroundColor: "#B3C9F5",
              },
            }}
          >
            Regresar al inicio
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
