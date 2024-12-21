import { Typography } from "@mui/material";
import React from "react";

function CompanyLogo() {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontWeight: 700,
        color: "inherit",
        textDecoration: "none",
      }}
    >
      TM
    </Typography>
  );
}

export default CompanyLogo;
