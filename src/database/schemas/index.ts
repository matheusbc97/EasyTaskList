import {appSchema} from '@nozbe/watermelondb';
import {categoriesSchema} from './categoriesSchema';
import {tasksSchema} from './tasksSchema';
import {usersSchema} from './usersSchema';

export default appSchema({
  version: 11,
  tables: [categoriesSchema, tasksSchema, usersSchema],
});
