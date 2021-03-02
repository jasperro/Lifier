import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Task from "./task.schema";
import Event from "./event.schema";
import Setting from "./setting.schema";
import { RxDatabase } from "rxdb";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

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
        statics: {
            createNew: async function (
                displayName: string,
                color: string | undefined
            ) {
                await this.insert({
                    display_name: displayName,
                    color: color ? color : undefined,
                });
            },
        },
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
        statics: {
            createNew: async function (categoryId, displayName) {
                const skill = await this.insert({
                    display_name: displayName,
                });

                const query = categoriesCollection.findOne(categoryId);
                const result = await query.exec();
                let existingSkills = await result.skills;
                existingSkills = existingSkills ? existingSkills : [];

                await categoriesCollection.upsert(
                    _.merge({}, result.toJSON(), {
                        skills: [...existingSkills, skill.skill_id],
                    })
                );
            },
        },
    });

    skillsCollection.preInsert(function (plainData) {
        plainData.skill_id = uuidv4();
    }, false);

    const tasksCollection = await database.collection({
        name: "tasks",
        schema: Task,
        statics: {
            createNew: async function (displayName: string) {
                await this.insert({
                    display_name: displayName,
                });
            },
            changeCategory: async function (categoryID: string) {
                await this.update({
                    $set: {
                        category: categoryID,
                    },
                });
            },
        },
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
