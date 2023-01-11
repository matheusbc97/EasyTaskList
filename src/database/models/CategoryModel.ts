import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class CategoryModel extends Model {
  static table = 'categories';

  @field('name')
  name!: string;

  @field('colorIndex')
  colorIndex!: number;

  @field('iconIndex')
  iconIndex!: number;
}
