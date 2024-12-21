import * as React from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import AddIcon from "@mui/icons-material/Add";
import FilterDropdown from "./FilterDropdown";

export default function TaskManagerHeader({
  handleOnCreate,
  totalTask = 0,
  filterList,
  handleOnFilterChange,
}) {
  return (
    <Sheet
      variant="solid"
      invertedColors
      sx={[
        {
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          p: 2,
          minWidth: "min-content",
        },
      ]}
    >
      <Typography>Total Task: {totalTask}</Typography>
      <Box sx={{ flex: 1, display: "flex", gap: 1, px: 2 }}>
        <FilterDropdown
          handleOnFilterChange={handleOnFilterChange}
          filterList={filterList}
        />
      </Box>
      <Box sx={{ display: "flex", flexShrink: 0, gap: 2 }}>
        <Button startDecorator={<AddIcon />} onClick={handleOnCreate}>
          New Task
        </Button>
      </Box>
    </Sheet>
  );
}
