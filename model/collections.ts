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
        methods: {
            changeDisplayName: async function (newName: string) {
                await this.update({
                    $set: {
                        display_name: newName,
                    },
                });
            },
        },
    });

    categoriesCollection.preInsert(async function (plainData) {
        //Categorie-ID een verkorte versie van de uuid, omdat er verwacht wordt
        //dat er weinig categorieën gemaakt gaan worden. TODO: Retry bij falen?

        plainData.skill_category_id = btoa(uuidv4()).replace(/(.{8})..+/, "$1");
        //Genereer categorie met opeenvolgende getallen, werkt niet met sync

        /*const query = categoriesCollection
            .findOne()
            .sort({ skill_category_id: "desc" });
        const result = await query.exec();
        plainData.skill_category_id =
            result && result.skill_category_id
                ? (parseInt(result.skill_category_id) + 1).toString()
                : "0";*/
    }, false);

    skillsCollection.preInsert(function (plainData) {
        plainData.skill_id = btoa(uuidv4());
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

    tasksCollection.preInsert(async function (plainData) {
        const category = await categoriesCollection
            .findOne(plainData.category)
            .exec();
        plainData.color = category == null ? category.color : null;
    }, true);

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
