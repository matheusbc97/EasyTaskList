import {createEntityAdapter} from '@reduxjs/toolkit';
import {Task} from '@shared/models';

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => {
    if (a.date > b.date) {
      return 1;
    }

    return -1;
  },
});

export {tasksAdapter};
