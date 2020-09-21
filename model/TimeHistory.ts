import { date, field } from '@nozbe/watermelondb/decorators'
import { Model } from '@nozbe/watermelondb'

class TimeHistoryItem extends Model {
  static table = 'time_history'
  @field('time_spent') timeSpent
  @field('skill_id') skillID 
  @field('activity_id') activityID 
  @date('completed_at') completedAt
}

export default TimeHistoryItem;
