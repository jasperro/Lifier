export default {
    title: "setting",
    version: 0,
    description: "describes a setting",
    type: "object",
    properties: {
        setting_id: {
            type: "string",
            primary: true,
        },
        bool_state: {
            type: "boolean",
            default: false,
        },
    },
    required: ["setting_id"],
};
