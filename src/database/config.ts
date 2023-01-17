import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import logger from '@nozbe/watermelondb/utils/common/logger';

import schema from './schemas';
//import migrations from './model/migrations'; ⬅️ You'll import your Models here
import PostModel from './models/CategoryModel';
import TaskModel from './models/TaskModel';
import UserModel from './models/UserModel';

let adapter: any = null;

if (process.env.JEST_WORKER_ID) {
  logger.silence();
  adapter = new LokiJSAdapter({
    schema,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
  });
} else {
  adapter = new SQLiteAdapter({
    schema,
  });
}

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [PostModel, TaskModel, UserModel],
});
