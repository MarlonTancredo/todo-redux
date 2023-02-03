import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    value: [
      {
        id: 1,
        data: { 1: { content: "Content 1", completed: false } },
      },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id);
    },

    editTask: (state, action) => {
      state.value.map((task) =>
        task.id === action.payload.id
          ? (task.data[1].content = action.payload.data)
          : "Not Found!"
      );
    },
    taskCompleted: (state, action) => {
      state.value.map((task) =>
        task.id === action.payload.id
          ? (task.data[1].completed = action.payload.data)
          : "Not Found"
      );
    },
  },
});

export const { addTask, deleteTask, editTask, taskCompleted } =
  taskSlice.actions;
export default taskSlice.reducer;
