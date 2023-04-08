import {database} from '@/database/config';
import {Task} from '@/modules/shared/models';

import {TABLE_KEYS} from '../constants/tableKeys';
import TaskModel from '../models/TaskModel';

export async function dbGetTaskById(taskId: string) {
  const tasksModel = await database
    .get<TaskModel>(TABLE_KEYS.TASKS)
    .find(taskId);

  return {
    category: await tasksModel.category.fetch(),
    date: tasksModel.date,
    title: tasksModel.title,
    done: tasksModel.done,
    id: tasksModel.id,
    description: tasksModel.description,
  } as Task;
}
