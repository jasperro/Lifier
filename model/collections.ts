import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Event from "./event.schema";
import Setting from "./setting.schema";
import { RxDatabase, randomCouchString } from "rxdb";

export default async function initializeCollections(
    database: RxDatabase
): Promise<any> {
    await database.collection({
        name: "skillcategories",
        schema: SkillCategory,
    });

    const skillsCollection = await database.collection({
        name: "skills",
        schema: Skill,
    });

    skillsCollection.preInsert(function (plainData) {
        plainData.skill_id = Date.now().toString() + randomCouchString(3);
    }, false);

    const eventsCollection = await database.collection({
        name: "events",
        schema: Event,
    });

    eventsCollection.preInsert(function (plainData) {
        const currentTime = Date.now();
        plainData.event_id = currentTime.toString() + randomCouchString(3);
        if (!plainData.start_time) {
            plainData.start_time = currentTime;
        }
    }, false);

    await database.collection({
        name: "settings",
        schema: Setting,
    });
}
