import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Event from "./event.schema";
import Setting from "./setting.schema";
import { RxDatabase } from "rxdb";

export default async function initializeCollections(
    database: RxDatabase
): Promise<any> {
    await database.collection({
        name: "skillcategories",
        schema: SkillCategory,
    });
    await database.collection({
        name: "settings",
        schema: Setting,
        methods: {
            getSetting: function () {
                return this.bool_state;
            },
        },
    });
}
