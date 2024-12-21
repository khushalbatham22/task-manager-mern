import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  editTask,
  filterTasks,
  getTasks,
  setEditTask,
  setShowAddEditTaskForm,
} from "../state/taskSlice";
import { formatDate } from "../utils/dateTimeFormater";
import { userDetails } from "../utils/localStorage";

const useTaskManager = () => {
  const formType = {
    CREATE: "Create",
    EDIT: "Edit",
  };

  const filterList = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Overdue", value: "overdue" },
    { id: 3, name: "Today", value: "today" },
  ];

  const { tasks, showAddEditTaskForm, selectedTask } = useSelector(
    ({ task }) => task
  );
  const dispatch = useDispatch();

  const getTaskList = async () => {
    dispatch(getTasks());
  };

  const handleOnEdit = ({ task }) => {
    dispatch(setEditTask({ selectedTask: task, showAddEditTaskForm: true }));
  };

  const handleOnDelete = ({ task }) => {
    dispatch(deleteTask({ id: task.id }));
  };

  const handleOnCreate = ({ isOpen }) => {
    dispatch(setShowAddEditTaskForm(isOpen));
  };

  const handleOnCloseModal = () => {
    dispatch(setEditTask({ selectedTask: null, showAddEditTaskForm: false }));
  };

  const handleOnCreateTask = ({ task, type }) => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      dueDate: formatDate(task.dueDate),
      createdBy: userDetails.getUserDetails().id
    };
    if (type === formType.CREATE) {
      dispatch(createTask(updatedTask));
    } else {
      dispatch(editTask({ id: selectedTask.id, ...updatedTask }));
    }
  };

  const handleOnFilterChange = ({ filter }) => {
    dispatch(filterTasks({ filterName: filter.toLowerCase() }));
  };

  return {
    handleOnEdit,
    handleOnDelete,
    getTaskList,
    taskList: tasks,
    handleOnCreate,
    showAddEditTaskForm,
    handleOnCreateTask,
    selectedTask,
    formType,
    filterList,
    handleOnFilterChange,
    handleOnCloseModal,
  };
};

export default useTaskManager;
