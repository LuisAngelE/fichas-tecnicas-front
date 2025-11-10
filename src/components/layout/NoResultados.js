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
  Button,
  Typography,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import Logo from "../layout/img/FOTON.png";
import Noresultados from "./gif/404.gif";

export default function NoResultados() {
  const [open, setOpen] = React.useState(false);
  const user_type = localStorage.getItem("user_type");

  const Admin = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    { name: "Mi perfil", value: "/Perfil", icon: <PersonIcon /> },
  ];

  const Viewer = [
    { name: "Inicio", value: "/Inicio", icon: <HomeIcon /> },
    { name: "Mi perfil", value: "/Perfil", icon: <PersonIcon /> },
  ];

  const menuItems = user_type === "1" ? Admin : user_type === "2" ? Viewer : [];

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

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
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
      <Divider />
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
