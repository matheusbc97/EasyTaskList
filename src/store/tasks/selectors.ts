import {Category} from '@shared/models';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {tasksAdapter} from './adapters';

export const tasksListSelectors = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks,
);

export const selectTasksFetchState = (state: RootState) =>
  state.tasks.fetchState;

export const selectTaskOfCategory = (category: Category) =>
  createSelector(tasksListSelectors.selectAll, tasks =>
    tasks.filter(task => task.category?.id === category.id),
  );

export const selectTasksNotDone = createSelector(
  tasksListSelectors.selectAll,
  tasks => tasks.filter(task => !task.done),
);
