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
        state: {
            type: ["boolean", "number", "string"],
        },
    },
    required: ["setting_id"],
};

export type SettingType = {
    setting_id: string;
    state?: boolean | number | string;
};
