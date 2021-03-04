export default {
    version: 0,
    title: "setting",
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

export type SettingType = {
    setting_id: string;
    state?: boolean | number | string;
};
