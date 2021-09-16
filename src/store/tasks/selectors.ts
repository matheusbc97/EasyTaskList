import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {tasksAdapter} from './adapters';

export const tasksListSelectors = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks,
);

export const selectTasksFetchState = (state: RootState) =>
  state.tasks.fetchState;

export const selectTaskOfCategory = (categoryId: string) =>
  createSelector(tasksListSelectors.selectAll, tasks =>
    tasks.filter(task => task.category?.id === categoryId),
  );

export const selectTasksNotDone = createSelector(
  tasksListSelectors.selectAll,
  tasks => tasks.filter(task => !task.done),
);
