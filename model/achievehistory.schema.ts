import { date, field } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

class AchieveHistoryItem extends Model {
  static table = "achieve_history"

  @field("action_type") timeSpent

  @field("skill_id") skillID

  @field("amount_recieved") activityID

  @field("is_completed") isCompleted

  @date("completed_at") completedAt
}

export default AchieveHistoryItem;
