export default {
    title: "skill",
    version: 0,
    description: "describes a skill",
    type: "object",
    properties: {
        skill_id: {
            type: "string",
            primary: true,
        },
        display_name: {
            type: "string",
        },
        color: {
            type: "string",
            pattern: "^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
            default: "#0077ce",
        },
    },
    required: ["display_name"],
};
