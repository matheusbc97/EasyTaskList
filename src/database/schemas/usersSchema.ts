import {tableSchema} from '@nozbe/watermelondb';
import {TABLE_KEYS} from '../constants/tableKeys';

export const usersSchema = tableSchema({
  name: TABLE_KEYS.USERS,
  columns: [
    {name: 'name', type: 'string'},
    {name: 'theme', type: 'string'},
    {name: 'avatar', type: 'number'},
  ],
});
