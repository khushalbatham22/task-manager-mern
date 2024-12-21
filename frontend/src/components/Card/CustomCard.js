import React from "react";
import { CardActions, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";

const CustomCard = ({ cardContent, cardAction }) => {
  return (
    <Box
      sx={{
        width: 275,
        textAlign: "left",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: 2,
      }}
    >
      <MuiCard variant="outlined">
        <CardContent>
          {typeof cardContent === "function" ? cardContent() : cardContent}
        </CardContent>
        <CardActions>
          {typeof cardAction === "function" ? cardAction() : cardAction}
        </CardActions>
      </MuiCard>
    </Box>
  );
};

export default CustomCard;
