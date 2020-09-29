// Database maken
import { Database } from "@nozbe/watermelondb";
import adapter from "./adapter"; // Sqlite op android/ios, loki op web

// Importeer modellen, dit is alles in de app die data opgeslagen heeft in de db.
import SkillCategory from "./SkillCategory";
import Skill from "./Skill";
import AchieveHistoryItem from "./AchieveHistory";
import TimeHistoryItem from "./TimeHistory";
import Setting from "./Setting";

// Exporteer de database dat de rest van de app het kan lezen
export default new Database({
  adapter,
  modelClasses: [
    SkillCategory,
    Skill,
    AchieveHistoryItem,
    TimeHistoryItem,
    Setting,
  ],
  actionsEnabled: true,
});
