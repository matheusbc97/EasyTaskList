import {Model} from '@nozbe/watermelondb';
import {field, writer} from '@nozbe/watermelondb/decorators';

export default class CategoryModel extends Model {
  static table = 'categories';

  /*static associations = {
    categories: {type: 'has_many', foreignKey: 'category_id'},
  } as const;*/

  @field('name')
  name!: string;

  @field('colorIndex')
  colorIndex!: number;

  @field('iconIndex')
  iconIndex!: number;

  @writer async updateT() {
    await this.update(comment => {
      comment.isSpam = true
    })
  }
}
