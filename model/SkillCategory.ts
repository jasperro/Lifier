/*import { field, children } from "@nozbe/watermelondb/decorators";
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

export default SkillCategory;*/


export default
  {
    "title": "hero schema",
    "version": 0,
    "description": "describes a simple hero",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "primary": true
      },
      "color": {
        "type": "string"
      },
      "healthpoints": {
        "type": "number",
        "minimum": 0,
        "maximum": 100
      },
      "secret": {
        "type": "string"
      },
      "birthyear": {
        "type": "number",
        "final": true,
        "minimum": 1900,
        "maximum": 2050
      },
      "skills": {
        "type": "array",
        "maxItems": 5,
        "uniqueItems": true,
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "damage": {
              "type": "number"
            }
          }
        }
      }
    },
    "required": ["color"],
  };

