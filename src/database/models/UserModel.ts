import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
import {TABLE_KEYS} from '../constants/tableKeys';

export default class UserModel extends Model {
  static table = TABLE_KEYS.USERS;

  @field('name')
  name!: string;

  @field('theme')
  theme!: string;

  @field('avatar')
  avatar!: number;
}
