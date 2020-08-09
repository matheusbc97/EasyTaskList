import {RootState} from '../index';
import {tasksAdapter} from './adapters';

export const tasksListSelectors = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks,
);
