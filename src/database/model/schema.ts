import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'categories',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'colorIndex', type: 'number'},
        {name: 'iconIndex', type: 'number'},
      ],
    }),
  ],
});
