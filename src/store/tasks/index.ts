import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  CreateTaskDTO,
} from './thunkActions';
import {
  tasksListSelectors,
  selectTasksFetchState,
  selectTaskOfCategory,
  selectTasksNotDone,
} from './selectors';
import {tasksAdapter} from './adapters';
import {Task} from '@shared/models';
import {categoriesInitialState} from '@/initialStates/categoriesInitialState';

const emptyState = tasksAdapter.getInitialState({
  fetchState: {
    isLoading: false,
    hasError: false,
  },
});

const tasksInitialState = [
  {
    category: categoriesInitialState[0],
    date: '2023-01-10T00:00:00',
    done: false,
    id: '1',
    title: 'flexoes',
  },
] as Task[];

const filledState = tasksAdapter.setAll(emptyState, tasksInitialState);

const tasks = createSlice({
  name: 'tasks',
  initialState: filledState,
  reducers: {
    resetTasks: () => {
      return filledState;
    },
    removeTaskById: (state, action: PayloadAction<string>) => {
      tasksAdapter.removeOne(state, action.payload);
    },
    addOneTask: (state, action: PayloadAction<Task>) => {
      tasksAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: builder => {
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

    builder.addCase(getTasks.pending, state => {
      state.fetchState.isLoading = true;
      state.fetchState.hasError = false;
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      tasksAdapter.setAll(state, action.payload);
      state.fetchState.isLoading = false;
      state.fetchState.hasError = false;
    });

    builder.addCase(getTasks.rejected, state => {
      state.fetchState.isLoading = false;
      state.fetchState.hasError = true;
    });
  },
});

export default tasks.reducer;

export const {resetTasks, removeTaskById, addOneTask} = tasks.actions;

export {
  tasksListSelectors,
  createTask,
  selectTasksFetchState,
  getTasks,
  updateTask,
  selectTaskOfCategory,
  selectTasksNotDone,
};

export type {CreateTaskDTO};
