import {createEntityAdapter} from '@reduxjs/toolkit';
import {Task} from '@shared/models';

const tasksAdapter = createEntityAdapter<Task>();

export {tasksAdapter};
