export default {
    version: 0,
    title: "skill schema",
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
            type: "string", // skillcategory_id
        },
    },
    required: ["display_name", "xp_amount"],
};
