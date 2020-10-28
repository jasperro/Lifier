import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Event from "./event.schema";
import Setting from "./setting.schema";
import { RxDatabase } from "rxdb";
import timebID from "root/utils/timebID";

const idGetter = new timebID();

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
        plainData.skill_id = idGetter.getID();
    }, false);

    const eventsCollection = await database.collection({
        name: "events",
        schema: Event,
    });

    eventsCollection.preInsert(function (plainData) {
        const currentTime = Date.now();
        plainData.event_id = idGetter.getID();
        if (!plainData.start_time) {
            plainData.start_time = currentTime;
        }
    }, false);

    await database.collection({
        name: "settings",
        schema: Setting,
    });
}
