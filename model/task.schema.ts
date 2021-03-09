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
        //Skill task belongs to
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
    required: ["display_name"],
};
