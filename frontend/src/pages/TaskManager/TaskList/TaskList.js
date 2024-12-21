import React from "react";
import CustomCard from "../../../components/Card/CustomCard";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userDetails } from "../../../utils/localStorage";

function TaskList({ tasks = [], handleOnEdit, handleOnDelete }) {
  if (!tasks) return null;
  const cardAction = ({ task }) => {
    const userId = userDetails.getUserDetails().id;
    console.log("task", userId, task);
    if (userId !== task.createdBy) return <Typography>Not Authorized to Edit or delete!</Typography>;

    return (
      <>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => handleOnEdit({ task })}
          sx={{ color: "#636B74", borderColor: "#636B74" }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => handleOnDelete({ task })}
          sx={{ backgroundColor: "#636B74" }}
        >
          Delete
        </Button>
      </>
    );
  };

  const cardContent = ({ task }) => {
    if (!task) return null;
    return (
      <Box>
        <Typography variant="h6" className="task-title">
          {task.title}
        </Typography>
        <Typography variant="subtitle1" className="task-description">
          Description: {task.description}
        </Typography>
        <Typography variant="subtitle1" className="task-due-date">
          Due Date: {task.dueDate}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        my: 2,
        flexWrap: "wrap",
      }}
    >
      {tasks?.map((task, index) => (
        <CustomCard
          key={task.id}
          cardContent={() => cardContent({ task })}
          cardAction={() => cardAction({ task })}
        />
      ))}
    </Box>
  );
}

export default TaskList;
