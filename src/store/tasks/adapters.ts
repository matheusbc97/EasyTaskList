import {createEntityAdapter} from '@reduxjs/toolkit';
import {Task} from '@shared/models';

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export {tasksAdapter};
