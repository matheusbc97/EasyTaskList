import {database} from '../config';
import {TABLE_KEYS} from '../constants/tableKeys';
import TaskModel from '../models/TaskModel';

export async function dbDeleteTask(taskId: string) {
  await database.write(async () => {
    const tasksModel = await database
      .get<TaskModel>(TABLE_KEYS.TASKS)
      .find(taskId);

    tasksModel.destroyPermanently();
  });
}
