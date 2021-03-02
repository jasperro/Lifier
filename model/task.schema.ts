export default {
    title: "task",
    version: 0,
    description: "describes a task",
    type: "object",
    properties: {
        task_id: {
            type: "string",
            primary: true,
        },
        display_name: {
            type: "string",
        },
        //Category task belongs to
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
            type: "string",
        },
    },
    required: ["display_name"],
};

export type TaskType = {
    task_id: string;
    display_name: string;
    category?: Array<string>;
    completed?: boolean;
    completion_time?: number;
    deadline_time?: number;
    state?: boolean | number | string;
    color?: string;
};
