import {createSlice} from '@reduxjs/toolkit';

import {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from './thunkActions';
import {
  tasksListSelectors,
  selectTasksFetchState,
  selectTaskOfCategory,
} from './selectors';
import {tasksAdapter} from './adapters';

const initialState = tasksAdapter.getInitialState({
  fetchState: {
    isLoading: false,
    hasError: false,
  },
});

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.fulfilled, (state, action) => {
      tasksAdapter.addOne(state, action.payload);
    });

    builder.addCase(
      updateTask.fulfilled,
      (state, {payload: {id, ...changes}}) => {
        tasksAdapter.updateOne(state, {id, changes});
      },
    );

    builder.addCase(
      updateTaskStatus.fulfilled,
      (state, {payload: {id, ...changes}}) => {
        tasksAdapter.updateOne(state, {id, changes});
      },
    );

    builder.addCase(getTasks.pending, (state) => {
      state.fetchState.isLoading = true;
      state.fetchState.hasError = false;
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload);
      state.fetchState.isLoading = false;
      state.fetchState.hasError = false;
    });

    builder.addCase(getTasks.rejected, (state) => {
      state.fetchState.isLoading = false;
      state.fetchState.hasError = true;
    });
  },
});

export default tasks.reducer;

export const {resetTasks} = tasks.actions;

export {
  tasksListSelectors,
  createTask,
  selectTasksFetchState,
  getTasks,
  updateTask,
  selectTaskOfCategory,
};
