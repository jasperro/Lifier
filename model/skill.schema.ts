import _ from "lodash";
import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import databasePromise from "./database";
import { SkillSchema } from "./skill.type";

export type SkillDocMethods = {
    edit: (this: SkillDocument, newName: string) => void;
    delete: (this: SkillDocument) => void;
};

export const skillDocMethods: SkillDocMethods = {
    edit: async function (newName) {
        await this.update({
            $set: {
                display_name: newName,
            },
        });
    },
    delete: async function () {
        const database = await databasePromise;
        const eventCollection = database.events;
        eventCollection.createNew("Skill", "Deleted");
        this.remove();
    },
};

export type SkillDocument = RxDocument<SkillSchema, SkillDocMethods>;

export type SkillCollectionMethods = {
    createNew: (
        this: SkillCollection,
        categoryId: string,
        displayName: string
    ) => void;
};

export const skillCollectionMethods: SkillCollectionMethods = {
    createNew: async function (categoryId, displayName) {
        const skill = await this.insert({
            display_name: displayName,
            ...(categoryId && { id: categoryId }),
        });

        const database = await databasePromise;
        const query = database.skillcategories.findOne(categoryId);
        const result = await query.exec();
        let existingSkills = await result.skills;
        existingSkills = existingSkills ? existingSkills : [];

        await database.skillcategories.upsert(
            _.merge({}, result.toJSON(), {
                skills: [...existingSkills, skill.id],
            })
        );
    },
};

export type SkillCollection = RxCollection<
    SkillDocument,
    SkillDocMethods,
    SkillCollectionMethods
>;

const skillSchema: RxJsonSchema<SkillDocument> = {
    version: 0,
    title: "skill schema",
    description: "describes a skill",
    type: "object",
    primaryKey: "id",
    properties: {
        id: {
            type: "string",
        },
        display_name: {
            type: "string",
        },
        color: {
            type: "string",
            pattern: "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
        },
        tasks: {
            type: "array",
            ref: "tasks",
            items: {
                type: "string",
            },
        },
        // Precalculate xp amount from time by default
        xp_amount: {
            type: "number",
            default: 0,
        },
        expected_completion_time: {
            type: "number", //unix epoch seconds
        },
        index: {
            type: "number", //position in the list, not changed directly by user.
        },
        category_id: {
            ref: "skillcategories", // in welke categorie bevindt de skill zich?
            type: "string", // id
        },
    },
    required: ["display_name", "xp_amount"],
};

export default skillSchema;
