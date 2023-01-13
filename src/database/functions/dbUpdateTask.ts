import {database} from '../config';
import {TABLE_KEYS} from '../constants/tableKeys';
import TaskModel from '../models/TaskModel';

export interface DbUpdateTaskParams {
  taskId: string;
  title?: string;
  date?: string;
  description?: string;
  done?: boolean;
}

export async function dbUpdateTask({taskId, ...updates}: DbUpdateTaskParams) {
  await database.write(async () => {
    const taskModel = await database
      .get<TaskModel>(TABLE_KEYS.TASKS)
      .find(taskId);

    taskModel.update(task => {
      Object.keys(updates).forEach(key => {
        (task as any)[key] = (updates as any)[key];
      });
    });
  });
}
