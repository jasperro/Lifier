export default {
    title: "event",
    version: 0,
    description: "describes a event in time, with a duration and action",
    type: "object",
    properties: {
        event_id: {
            type: "string", // Generate random uuid?
            primary: true,
        },
        action_type: {
            type: "string", // SKILL, WORK || SCHOOL, OTHER
        },
        start_time: {
            type: "integer", // Unix epoch time
        },
        duration: {
            type: "integer", // Unix epoch time
        },
    },
    required: ["event_id"],
};
