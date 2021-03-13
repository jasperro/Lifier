import { SkillCategorySchema } from "./skillcategory.type";
import { SkillSchema } from "./skill.type";
import { TaskSchema } from "./task.type";
import { EventSchema } from "./event.type";
import { SettingSchema } from "./setting.type";
import SkillCategory from "./skillcategory.schema";
import Skill from "./skill.schema";
import Task from "./task.schema";
import Event, { action_enum, action_type_enum } from "./event.schema";
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
    await database.addCollections({
        skillcategories: {
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
            methods: {
                delete: async function () {
                    const eventCollection = database.events;
                    eventCollection.createNew("SkillCategory", "Deleted");
                    this.remove();
                },
            },
        },
        skills: {
            schema: Skill,
            statics: {
                createNew: async function (categoryId, displayName) {
                    const skill = await this.insert({
                        display_name: displayName,
                        ...(categoryId && { category_id: categoryId }),
                    });

                    const query = database.skillcategories.findOne(categoryId);
                    const result = await query.exec();
                    let existingSkills = await result.skills;
                    existingSkills = existingSkills ? existingSkills : [];

                    await database.skillcategories.upsert(
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
        },

        tasks: {
            schema: Task,
            statics: {
                createNew: async function (
                    displayName: string,
                    skillId: string
                ) {
                    const dbReturns = skillId
                        ? (async function () {
                              const skill:
                                  | SkillSchema
                                  | undefined = await database.skills
                                  .findOne(skillId)
                                  .exec();
                              const skillcategory:
                                  | SkillCategorySchema
                                  | undefined = await skill.category_id_;
                              const categoryId:
                                  | string
                                  | undefined = await skill.category_id;
                              return {
                                  color: skillcategory.color
                                      ? skillcategory.color
                                      : "#ff0022",
                                  categoryId: categoryId
                                      ? categoryId
                                      : undefined,
                              };
                          })()
                        : null;
                    const { color, categoryId } = await dbReturns;
                    const newDocument = await this.insert({
                        display_name: displayName,
                        skill: skillId,
                        category: categoryId,
                        color: color,
                    });

                    const eventCollection = database.events;
                    eventCollection.createNew(
                        "Task",
                        "Created",
                        newDocument.task_id
                    );
                },
            },
            methods: {
                finish: async function () {
                    const eventCollection = database.events;
                    eventCollection.createNew("Task", "Finished", this.task_id);
                    const settingsCollection = database.settings;

                    const query = settingsCollection
                        .findOne()
                        .where("setting_id")
                        .eq("current_xp");

                    const result = await query.exec();

                    await result.update({
                        $inc: {
                            state: 100,
                        },
                    });
                    this.remove();
                },
                delete: async function () {
                    const eventCollection = database.events;
                    eventCollection.createNew("Task", "Deleted", this.task_id);
                    this.remove();
                },
                changeCategory: async function (categoryID: string) {
                    await this.update({
                        $set: {
                            category: categoryID,
                            color: (
                                await database.skillcategories
                                    .findOne(categoryID)
                                    .exec()
                            ).color,
                        },
                    });
                },
            },
        },
        events: {
            schema: Event,
            statics: {
                createNew: async function (
                    actionType: action_type_enum,
                    action?: action_enum,
                    taskId?: string
                ) {
                    await this.insert({
                        action_type: actionType
                            ? action_type_enum[actionType]
                            : undefined,
                        action: action ? action_enum[action] : undefined,
                        ...(taskId && { task_id: taskId }),
                    });
                },
            },
        },
        settings: {
            schema: Setting,
        },
    });

    database.skillcategories.preInsert(async function (plainData) {
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

    database.skills.preInsert(function (plainData) {
        plainData.skill_id = btoa(uuidv4());
    }, false);

    database.tasks.preInsert(function (plainData) {
        plainData.task_id = uuidv4();
    }, false);

    database.events.preInsert(function (plainData) {
        const currentTime = Date.now();
        plainData.event_id = uuidv4();
        if (!plainData.start_time) {
            plainData.start_time = currentTime;
        }
    }, false);
}
