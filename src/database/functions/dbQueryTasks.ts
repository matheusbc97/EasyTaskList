import {database} from '@/database/config';
import {Task} from '@/shared/models';

import {TABLE_KEYS} from '../constants/tableKeys';
import TaskModel from '../models/TaskModel';

export async function dbQueryTasks() {
  const tasksCollection = await database
    .get<TaskModel>(TABLE_KEYS.TASKS)
    .query()
    .fetch();

  const tasksPromises = tasksCollection.map(
    async taskItem =>
      ({
        category: await taskItem.category.fetch(),
        date: taskItem.date,
        title: taskItem.title,
        done: taskItem.done,
        id: taskItem.id,
        description: taskItem.description,
      } as Task),
  );

  const tasks = await Promise.all(tasksPromises);

  return tasks;
}
