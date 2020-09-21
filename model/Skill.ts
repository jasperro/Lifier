import { date, field } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'

class Skill extends Model {
  static table = 'skills'
  @field('skill_name') skillName
  @field('skill_id') skillID 
  @field('category_id') categoryID
  static associations = {
    posts: { type: 'belongs_to', key: 'category_id' },
  }
}

export default Skill;
