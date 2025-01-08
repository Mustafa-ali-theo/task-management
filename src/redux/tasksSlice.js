import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ ...action.payload, id: Date.now() });
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index !== -1) {
        state[index] = updatedTask;
      }
    },
  },
});

export const { addTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
