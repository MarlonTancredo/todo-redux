import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../store/Tasks";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
