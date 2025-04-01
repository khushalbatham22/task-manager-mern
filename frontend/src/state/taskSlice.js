import { createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./authSlice";
import { accessToken } from "../utils/localStorage";

const initialState = {
  tasks: [],
  showAddEditTaskForm: false,
  selectedTask: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasksList: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setEditTask: (state, action) => {
      state.showAddEditTaskForm = action.payload.showAddEditTaskForm;
      state.selectedTask = action.payload.selectedTask;
    },
    updateTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          if (task) {
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
          }
          return task;
        } else {
          return task;
        }
      });
    },
    removeTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setShowAddEditTaskForm: (state, action) => {
      state.showAddEditTaskForm = action.payload;
    },
  },
});

export default taskSlice.reducer;
export const {
  addTask,
  updateTask,
  removeTask,
  setShowAddEditTaskForm,
  getTasksList,
  setEditTask,
} = taskSlice.actions;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
export function getTasks() {
  return (dispatch) => {
    fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(getTasksList(data.tasks));
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks", error);
      });
  };
}

export function createTask({ title, description, dueDate, createdBy }) {
  return (dispatch) => {
    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.getAccessToken()}`,
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        createdBy,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            // dispatch(addTask(data));
            dispatch(setMessage(data.message));
            dispatch(getTasks());
          });
        }
      })
      .catch((error) => {
        console.error("Error adding task", error);
      });
  };
}

export function editTask({ id, title, description, dueDate, createdBy }) {
  return (dispatch) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.getAccessToken()}`,
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        createdBy,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(updateTask({ id, title, description, dueDate }));
            dispatch(getTasks());
            dispatch(
              setEditTask({ selectedTask: null, showAddEditTaskForm: false })
            );
            dispatch(setMessage(data.message));
          });
        }
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };
}

export function deleteTask({ id }) {
  return (dispatch) => {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.getAccessToken()}`,
      },
      //   body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(removeTask(id));
            dispatch(setMessage(data.message));
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };
}

export function filterTasks({ filterName }) {
  return (dispatch) => {
    fetch(`${API_URL}/tasks/filter?status=${filterName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.getAccessToken()}`,
        Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(getTasksList(data.tasks));
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks", error);
      });
  };
}
