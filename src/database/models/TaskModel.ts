import {Category} from '@/shared/models';
import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';
import {TABLE_KEYS} from '../constants/tableKeys';

export default class TaskModel extends Model {
  static table = TABLE_KEYS.TASKS;

  @field('title')
  title!: string;

  @field('date')
  date!: string;

  @field('description')
  description!: string;

  @field('done')
  done!: boolean;

  @relation(TABLE_KEYS.CATEGORIES, 'category_id') category!: Category;
}
