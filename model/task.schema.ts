import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { CategoryDocument } from "./category.schema";
import { CategorySchema } from "./category.type";
import { TaskSchema } from "./task.type";
import databasePromise from "model/database";
import { getSetting, SettingId } from "./setting.schema";

export type TaskDocMethods = {
    finish: (this: TaskDocument) => void;
    edit: (this: TaskDocument, newName: string) => void;
    delete: (this: TaskDocument) => void;
    changeCategory: (this: TaskDocument, categoryID: string) => void;
};

export const taskDocMethods: TaskDocMethods = {
    finish: async function () {
        const database = await databasePromise;
        const eventCollection = database.events;
        eventCollection.createNew("Task", "Finished", this.id);

        const result = await getSetting(SettingId.CurrentXP);

        await result.update({
            $inc: {
                state: 100,
            },
        });
        this.remove();
    },
    edit: async function (newName) {
        await this.update({
            $set: {
                display_name: newName,
            },
        });
    },
    delete: async function () {
        const eventCollection = database.events;
        eventCollection.createNew("Task", "Deleted", this.id);
        this.remove();
    },
    changeCategory: async function (categoryID) {
        await this.update({
            $set: {
                category: categoryID,
                color: (
                    await database.skillcategories.findOne(categoryID).exec()
                ).color,
            },
        });
    },
};

export type TaskDocument = RxDocument<TaskSchema, TaskDocMethods>;

export type TaskCollectionMethods = {
    createNew: (
        this: TaskCollection,
        displayName: string,
        skillId: string
    ) => void;
};

export const taskCollectionMethods: TaskCollectionMethods = {
    createNew: async function (displayName, skillId) {
        const database = await databasePromise;
        const skill = await database.skills.findOne(skillId).exec();
        if (!skill) {
            throw "Skill does not exist";
        }
        const categoryId: string | undefined = skill.id;
        if (!categoryId) {
            throw "Skill does not belong to a category";
        }
        const skillcategory = await database.skillcategories
            .findOne(categoryId)
            .exec();

        const newDocument: TaskDocument = await this.insert({
            display_name: displayName,
            skill: skillId,
            category: categoryId,
            color: skillcategory ? skillcategory.color : "#ff0022",
        });

        const existingTasks = skill.tasks ? skill.tasks : [];

        skill.update({
            $set: {
                tasks: [...existingTasks, newDocument.id],
            },
        });

        const eventCollection = database.events;
        eventCollection.createNew("Task", "Created", newDocument.id);
    },
};

export type TaskCollection = RxCollection<TaskDocument, TaskCollectionMethods>;

const taskSchema: RxJsonSchema<TaskDocument> = {
    version: 0,
    title: "task schema",
    description: "describes a task",
    type: "object",
    primaryKey: "id",
    properties: {
        id: {
            type: "string",
        },
        display_name: {
            type: "string",
        },
        /** Skill task belongs to */
        skill: {
            type: ["string", "null"],
            ref: "skills",
        },
        category: {
            type: ["string", "null"],
            ref: "skillcategories",
        },
        completed: {
            type: "boolean",
        },
        completion_time: {
            type: "number",
        },
        deadline_time: {
            type: "number",
        },
        color: {
            type: ["string", "null"],
        },
        xp_worth: {
            type: "number",
            default: 100,
        },
    },
    required: ["display_name", "id"],
};

export default taskSchema;
