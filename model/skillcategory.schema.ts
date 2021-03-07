export default {
    version: 0,
    title: "skill category schema",
    description: "describes a skill category that references skills",
    type: "object",
    properties: {
        skill_category_id: {
            type: "string",
            primary: true,
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
