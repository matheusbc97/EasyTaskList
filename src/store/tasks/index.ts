import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {createTask, getTasks, CreateTaskDTO} from './thunkActions';
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
    updateTask: (
      state,
      {
        payload: {id, changes},
      }: PayloadAction<{id: string; changes: Partial<Task>}>,
    ) => {
      tasksAdapter.updateOne(state, {
        id,
        changes,
      });
    },
    deleteTask: (state, action: PayloadAction<{id: string}>) => {
      tasksAdapter.removeOne(state, action.payload.id);
    },
  },
});

export default tasks.reducer;

export const {resetTasks, removeTaskById, addOneTask, updateTask, deleteTask} =
  tasks.actions;

export {
  tasksListSelectors,
  createTask,
  selectTasksFetchState,
  getTasks,
  selectTaskOfCategory,
  selectTasksNotDone,
};

export type {CreateTaskDTO};
