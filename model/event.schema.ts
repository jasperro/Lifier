export default {
    version: 0,
    title: "event",
    description: "describes a event in time, with a duration and action",
    type: "object",
    properties: {
        event_id: {
            type: "string", // timestamp met random drie chars
            primary: true,
        },
        action_type: {
            type: "string",
            default: "OTHER",
            // Toegestane waarden voor actie
            enum: ["SKILL", "WORK", "SCHOOL", "XP", "TASK", "OTHER"],
        },
        start_time: {
            type: "integer", // Unix epoch
        },
        duration: {
            type: "integer", // Tijd in seconden
        },
    },
    required: ["event_id", "action_type", "start_time"],
    indexes: ["action_type", "start_time"],
};
