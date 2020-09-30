import SkillCategory from "./SkillCategory";
/*import Skill from "./Skill";
import AchieveHistoryItem from "./AchieveHistory";
import TimeHistoryItem from "./TimeHistory";
import Setting from "./Setting";*/
import { promiseSeries, RxDatabase } from "rxdb";

export default async function initializeCollections(database) {
  const skillCategoryCollection = await database.collection({
    name: 'skillcategories',
    schema: SkillCategory,
    pouchSettings: {}, // (optional)
    autoMigrate: true, // (optional)
  });
}


/*import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      // Categorieën van skills
      name: "skill_categories",
      columns: [
        { name: "category_name", type: "string" },
        { name: "category_id", type: "string" }, // UUID gegenereerd voor de categorie
      ],
    }),
    tableSchema({
      // Alle beschikbare skills
      name: "skills",
      columns: [
        { name: "skill_name", type: "string" },
        { name: "category_id", type: "string" }, // Tot welke categorie behoort de skill
        { name: "skill_id", type: "string" }, // UUID van skill, gebruikt om de skill te referencen
      ],
    }),
    tableSchema({
      // Geschiedenis van behaalde XP op welk moment en waarvoor
      name: "achieve_history",
      columns: [
        { name: "action_type", type: "string" },
        { name: "skill_id", type: "string", isOptional: true }, // UUID gegenereerd voor elke gemaakte skill
        { name: "amount_recieved", type: "number" },
        { name: "is_completed", type: "boolean" },
        { name: "completed_at", type: "number" }, // Unix timestamp
      ],
    }),
    tableSchema({
      // Geschiedenis van bestede tijd voor welke reden
      name: "time_history",
      columns: [
        { name: "time_spent", type: "number" }, // Bestede tijd in seconden
        { name: "skill_id", type: "string", isOptional: true }, // Dezelfde skill_id als in achieve_history
        { name: "activity_id", type: "string", isOptional: true }, // Activiteit die niet bij XP-behaling hoort
        { name: "completed_at", type: "number" }, // Unix timestamp
      ],
    }),
    tableSchema({
      name: "settings",
      columns: [
        { name: "setting_id", type: "string" },
        {
          name: "boolean_value",
          type: "boolean",
          isIndexed: true,
          optional: true,
        },
        {
          name: "string_value",
          type: "string",
          isIndexed: true,
          optional: true,
        },
        {
          name: "number_value",
          type: "number",
          isIndexed: true,
          optional: true,
        },
      ],
    }),
  ],
});
*/
