import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { EventSchema } from "./event.type";

export enum action_type_enum {
    Other = "OTHER",
    Skill = "SKILL",
    SkillCategory = "SKILLCATEGORY",
    XP = "XP",
    Task = "TASK",
}

export enum action_enum {
    Other = "OTHER",
    Finished = "FINISHED",
    Created = "CREATED",
    Started = "STARTED",
    Deleted = "DELETED",
    Edited = "EDITED",
}

export type EventDocument = RxDocument<EventSchema>;

export type EventCollectionMethods = {
    createNew: (this: EventCollection,
                    actionType: keyof typeof action_type_enum,
                    action?: keyof typeof action_enum,
                    taskId?: string
                ) => void
}

export const eventCollectionMethods: EventCollectionMethods = {
                createNew: async function (
                    actionType,
                    action,
                    taskId,
                ) {
                    await this.insert({
                        action_type: actionType
                            ? action_type_enum[actionType]
                            : undefined,
                        action: action ? action_enum[action] : undefined,
                        ...(taskId && { id: taskId }),
                    });
                },
            }

export type EventCollection = RxCollection<EventDocument, EventCollectionMethods>;

const eventSchema: RxJsonSchema<EventDocument> = {
    version: 0,
    title: "event schema",
    description: "describes a event in time, with a duration and action",
    type: "object",
    primaryKey: "id",
    properties: {
        id: {
            type: "string", // uuidv4
        },
        action_type: {
            type: "string",
            default: action_type_enum["Other"],
            // Toegestane waarden voor type van de actie (voor makkelijk sorteren)
            // Bij een SKILL telt generic bestede tijd voor XP mee.
            // Bij TASK telt completion event mee, met XP gebaseerd op bestede tijd.
            // XP wordt gebruikt bij het toevoegen van XP bij het testen.
            enum: Object.values(action_type_enum),
        },
        action: {
            type: "string",
            default: action_enum["Other"],
            // Toegestane waarden voor actie
            // FINISHED ook gebruiken bij XP toevoegen bij testen.
            enum: Object.values(action_enum),
        },
        xp_amount: {
            // Hoeveel het event waard is in XP bij "FINISHED"
            type: "integer",
        },
        //TODO: toevoegen van link naar skill, task...
        start_time: {
            type: "integer", // Unix epoch
        },
        duration: {
            // Tijd in seconden die besteed zijn voor de skill/task
            // Wordt gebruikt om default xp_amount te berekenen als die niet aanwezig is.
            type: "integer",
        },
        task_id: {
            ref: "tasks", // Tot welke task behoort het event
            type: ["string", "null"], // id
        },
    },
    required: ["id", "action_type", "start_time"],
    indexes: ["action_type", "start_time"],
};

export default eventSchema;