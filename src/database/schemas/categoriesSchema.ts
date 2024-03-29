import {tableSchema} from '@nozbe/watermelondb';

export const categoriesSchema = tableSchema({
  name: 'categories',
  columns: [
    {name: 'name', type: 'string'},
    {name: 'colorIndex', type: 'number'},
    {name: 'iconIndex', type: 'number'},
  ],
});
