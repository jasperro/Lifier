export default {
    version: 0,
    title: "task schema",
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
            type: ["string", "null"],
        },
    },
    required: ["display_name"],
};
