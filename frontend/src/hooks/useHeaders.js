import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { accessToken } from "../utils/localStorage";

function useHeaders() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const routes = [
    {
      page: "Home",
      to: "/",
      needAuth: true,
    },
    {
      page: "Task manager",
      to: "/task-manager",
      needAuth: true,
    },
    {
      page: "Login",
      to: "/login",
      needAuth: false,
    },
    {
      page: "Registration",
      to: "/registration",
      needAuth: false,
    },
    {
      page: "About",
      to: "/about",
      needAuth: false,
    },
  ];

  const excluedRoutes = ["/about"];

  const validateRoutes = (route) => {
    if (excluedRoutes.includes(route.to)) return true; //to show those routes which should be in before and after authentication both
    if (route.needAuth) {
      return isAuthenticated;
    } else {
      return !isAuthenticated;
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigateTo = ({ to }) => {
    navigate(to);
  };

  const handleOnLogout = () => {
    accessToken.removeAccessToken();
    logout();
    navigate("/login");
  };
  return {
    routes,
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleNavigateTo,
    handleOnLogout,
    validateRoutes,
  };
}

export default useHeaders;
