// Database maken

import { Database } from "@nozbe/watermelondb";
import adapter from "./adapter";
import SkillCategory from "./SkillCategory";
import Skill from "./Skill";
import AchieveHistoryItem from "./AchieveHistory";
import TimeHistoryItem from "./TimeHistory";
import Setting from "./Setting";

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
