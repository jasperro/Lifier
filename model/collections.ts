import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Task from "./task.schema";
import Event from "./event.schema";
import Setting from "./setting.schema";
import { RxDatabase } from "rxdb";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

function generateKebabId(inString: string) {
    return inString
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("-");
}

export default async function initializeCollections(
    database: RxDatabase
): Promise<any> {
    const categoriesCollection = await database.collection({
        name: "skillcategories",
        schema: SkillCategory,
    });

    categoriesCollection.preInsert(function (plainData) {
        plainData.skill_category_id = generateKebabId(plainData.display_name);
    }, true);

    categoriesCollection.preSave(function (plainData) {
        plainData.skill_category_id = generateKebabId(plainData.display_name);
    }, true);

    const skillsCollection = await database.collection({
        name: "skills",
        schema: Skill,
    });

    skillsCollection.preInsert(function (plainData) {
        plainData.skill_id = uuidv4();
    }, false);

    const tasksCollection = await database.collection({
        name: "tasks",
        schema: Task,
    });

    tasksCollection.preInsert(function (plainData) {
        plainData.task_id = uuidv4();
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
