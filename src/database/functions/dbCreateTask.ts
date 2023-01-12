import {database} from '../config';
import {TABLE_KEYS} from '../constants/tableKeys';
import TaskModel from '../models/TaskModel';

interface DbCreateTaskParams {
  title: string;
  description?: string;
  date: string;
  categoryId: string;
}

export async function dbCreateTask(params: DbCreateTaskParams) {
  await database.write(async () => {
    await database.get<TaskModel>(TABLE_KEYS.TASKS).create(data => {
      data.title = params.title;
      data.description = params.description;
      data.date = params.date;
      data.category.id = params.categoryId;
    });
  });
}
