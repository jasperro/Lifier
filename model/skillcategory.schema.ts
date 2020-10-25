export default {
    title: "skill category",
    version: 0,
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
            ref: "skill",
            items: {
                type: "string",
            },
        },
        color: {
            type: "string",
            pattern: "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
            default: "#0077ce",
        },
    },
    required: ["display_name"],
};
