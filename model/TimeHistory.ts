export default
{
    title: "setting",
    version: 0,
    description: "describes a setting",
    type: "object",
    properties: {
        bool_state: {
            type: "boolean",
            primary: true,
        },
        setting_id: {
            type: "string",
        },
    },
    required: ["setting_id"],
};
