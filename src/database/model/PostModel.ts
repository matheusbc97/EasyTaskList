import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class PostModel extends Model {
  static table = 'posts';

  @field('name')
  name!: string;
}
