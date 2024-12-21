import React, { useEffect } from "react";
import TaskList from "./TaskList/TaskList";
import useTaskManager from "../../hooks/useTaskManager";
import { Button } from "@mui/material";
import AddTaskModal from "./AddTaskModal/AddTaskModal";
import TaskManagerHeader from "./TaskManagerHeader/TaskManagerHeader";

function TaskManager() {
  const {
    handleOnEdit,
    handleOnDelete,
    taskList,
    getTaskList,
    handleOnCreate,
    showAddEditTaskForm,
    handleOnCreateTask,
    selectedTask,
    formType,
    filterList,
    handleOnFilterChange,
    handleOnCloseModal,
  } = useTaskManager();

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <div>
      <TaskManagerHeader
        handleOnCreate={() => handleOnCreate({ isOpen: true })}
        totalTask={taskList.length}
        filterList={filterList}
        handleOnFilterChange={handleOnFilterChange}
      />
      {!taskList || taskList.length === 0 ? (
        <>
          <p>Hurray!!! No task are there!</p>
          <p>Create a new task</p>
          <Button
            variant="contained"
            onClick={() => handleOnCreate({ isOpen: true })}
            sx={{ background: "#282c34" }}
          >
            Create
          </Button>
        </>
      ) : (
        <TaskList
          tasks={taskList}
          handleOnEdit={handleOnEdit}
          handleOnDelete={handleOnDelete}
        />
      )}

      {showAddEditTaskForm && (
        <AddTaskModal
          open={showAddEditTaskForm}
          onClose={handleOnCloseModal}
          handleOnSubmit={handleOnCreateTask}
          selectedTask={selectedTask}
          type={selectedTask ? formType.EDIT : formType.CREATE}
        />
      )}
    </div>
  );
}

export default TaskManager;
