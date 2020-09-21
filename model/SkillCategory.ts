import { date, field } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'

class SkillCategory extends Model {
  static table = 'skill_categories'
  @field('category_id') categoryID
  @field('category_name') categoryName
  static associations = {
    comments: { type: 'has_many', foreignKey: 'skill_id' },
  }
}

export default SkillCategory;
