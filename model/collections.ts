import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Event from "./event.schema";
import Setting from "./setting.schema";
import { RxDatabase } from "rxdb";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

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
        plainData.skill_id = uuidv4();
    }, false);

    const eventsCollection = await database.collection({
        name: "events",
        schema: Event,
    });

    eventsCollection.preInsert(function (plainData) {
        const currentTime = Date.now();
        plainData.event_id = uuidv4();
        if (!plainData.start_time) {
            plainData.start_time = currentTime;
        }
    }, false);

    const settingsCollection = await database.collection({
        name: "settings",
        schema: Setting,
    });

    /*settingsCollection.sync({
        waitForLeadership: true,
        direction: {
            pull: true, // default=true
            push: true, // default=true
        },
        options: {
            live: true,
            retry: true,
        },
    });*/
}
