import { field, children } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

class SkillCategory extends Model {
  static table = "skill_categories";
  @field("category_id") categoryID;
  @field("category_name") categoryName;
  static associations = {
    skills: { type: "has_many", foreignKey: "skill_id" },
  };
  @children("skills") skills;
}

export default SkillCategory;
