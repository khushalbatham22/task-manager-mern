import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
import useHeaders from "../../hooks/useHeaders";
import CompanyLogo from "../Logo/CompanyLogo";

function Header() {
  const {
    routes,
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleNavigateTo,
    handleOnLogout,
    validateRoutes,
    isAuthenticated,
  } = useHeaders();

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className="App-header">
        <Toolbar disableGutters>
          <CompanyLogo />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {routes.map((page) => (
                <MenuItem
                  key={page.page}
                  onClick={() => handleNavigateTo({ to: page.to })}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.filter(validateRoutes).map((page) => (
              <Button
                key={page.page}
                onClick={() => handleNavigateTo({ to: page.to })}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && (
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleOnLogout}
                  sx={{ p: 0, color: "white" }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
