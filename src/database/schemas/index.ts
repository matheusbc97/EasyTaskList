import {appSchema} from '@nozbe/watermelondb';
import {categoriesSchema} from './categoriesSchema';
import {tasksSchema} from './tasksSchema';

export default appSchema({
  version: 3,
  tables: [categoriesSchema, tasksSchema],
});
