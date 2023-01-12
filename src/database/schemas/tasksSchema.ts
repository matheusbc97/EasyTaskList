import {tableSchema} from '@nozbe/watermelondb';

export const tasksSchema = tableSchema({
  name: 'tasks',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'date', type: 'string'},
    {name: 'description', type: 'string'},
    {name: 'done', type: 'boolean'},
    {name: 'category_id', type: 'string'},
  ],
});
