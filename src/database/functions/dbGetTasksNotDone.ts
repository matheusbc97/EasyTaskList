import {database} from '@/database/config';
import {Task} from '@/modules/shared/models';
import {Q} from '@nozbe/watermelondb';

import {TABLE_KEYS} from '../constants/tableKeys';
import TaskModel from '../models/TaskModel';

export async function dbGetTasksNotDone() {
  const tasksCollection = await database
    .get<TaskModel>(TABLE_KEYS.TASKS)
    .query(Q.where('done', false))
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
