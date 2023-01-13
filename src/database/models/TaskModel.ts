import {Model, Relation} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';
import {TABLE_KEYS} from '../constants/tableKeys';
import CategoryModel from './CategoryModel';

export default class TaskModel extends Model {
  static table = TABLE_KEYS.TASKS;

  /*static associations = {
    category: {type: 'belongs_to', key: 'category_id'},
  } as const;*/

  @field('title')
  title!: string;

  @field('date')
  date!: string;

  @field('description')
  description?: string;

  @field('done')
  done!: boolean;

  @relation(TABLE_KEYS.CATEGORIES, 'category_id')
  category!: Relation<CategoryModel>;
}
