import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { CategorySchema } from "./category.type";
import databasePromise from "./database";
import { SkillDocument } from "./skill.schema";

export type CategoryDocMethods = {
    edit: (
        this: CategoryDocument,
        newName: string,
        color: string | undefined
    ) => void;
    delete: (this: CategoryDocument) => void;
};

export const categoryDocMethods: CategoryDocMethods = {
    delete: async function () {
        const database = await databasePromise;
        const eventCollection = database.events;
        eventCollection.createNew("SkillCategory", "Deleted");
        this.remove();
    },
    edit: async function (newName, color) {
        this.update({
            $set: {
                display_name: newName,
                color: color,
            },
        });
        try {
            const skills = await this.skills_;
            if (skills) {
                skills.forEach(async (element) => {
                    const tasks = await element.tasks_;
                    if (tasks) {
                        try {
                            tasks.forEach(async (element) => {
                                element.update({ $set: { color: color } });
                            });
                        } catch {}
                    }
                });
            }
        } catch {}
        // Bij alle skills in array
    },
};

export type CategoryDocument = RxDocument<CategorySchema, CategoryDocMethods>;

export type CategoryCollectionMethods = {
    createNew: (
        this: CategoryCollection,
        displayName: string,
        color: string | undefined
    ) => void;
};

export const categoryCollectionMethods: CategoryCollectionMethods = {
    createNew: async function (displayName, color) {
        const newDocument = {
            display_name: displayName,
            color: color ? color : undefined,
        };
        await this.insert(newDocument);
    },
};

export type CategoryCollection = RxCollection<
    CategoryDocument,
    CategoryDocMethods,
    CategoryCollectionMethods
>;

const categorySchema: RxJsonSchema<CategoryDocument> = {
    version: 0,
    title: "skill category schema",
    description: "describes a skill category that references skills",
    type: "object",
    primaryKey: "id",
    properties: {
        id: {
            type: "string",
        },
        display_name: {
            type: "string",
        },
        skills: {
            type: "array",
            ref: "skills",
            items: {
                type: "string",
            },
        },
        color: {
            type: "string",
            pattern: "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
        },
        index: {
            type: "number", //position in the list, not changed directly by user.
        },
    },
    required: ["display_name"],
};

export default categorySchema;
