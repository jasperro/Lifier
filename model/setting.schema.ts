/* Settings wordt gebruikt voor instellingen en opslag van XP-gegevens zoals profession en level */

export default {
    version: 0,
    title: "setting schema",
    description: "describes a setting",
    type: "object",
    properties: {
        setting_id: {
            type: "string",
            primary: true,
        },
        state: {
            type: ["boolean", "number", "string", "null"],
        },
    },
    required: ["setting_id"],
};
