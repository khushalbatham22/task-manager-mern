import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../state/taskSlice";
import authReducer from "../state/authSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
