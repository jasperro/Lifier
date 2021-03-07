export default {
    version: 0,
    title: "event schema",
    description: "describes a event in time, with a duration and action",
    type: "object",
    properties: {
        event_id: {
            type: "string", // uuidv4
            primary: true,
        },
        action_type: {
            type: "string",
            default: "OTHER",
            // Toegestane waarden voor type van de actie (voor makkelijk sorteren)
            // Bij een SKILL telt generic bestede tijd voor XP mee.
            // Bij TASK telt completion event mee, met XP gebaseerd op bestede tijd.
            // XP wordt gebruikt bij het toevoegen van XP bij het testen.
            enum: ["SKILL", "XP", "TASK", "OTHER"],
        },
        action: {
            type: "string",
            default: "OTHER",
            // Toegestane waarden voor actie
            // FINISHED ook gebruiken bij XP toevoegen bij testen.
            enum: ["FINISHED", "CREATED", "STARTED", "DELETED", "EDITED"],
        },
        xp_amount: {
            // Hoeveel het event waard is in XP bij "FINISHED"
            type: "integer",
        },
        //TODO: toevoegen van link naar skill, task...
        start_time: {
            type: "integer", // Unix epoch
        },
        duration: {
            // Tijd in seconden die besteed zijn voor de skill/task
            // Wordt gebruikt om default xp_amount te berekenen als die niet aanwezig is.
            type: "integer",
        },
    },
    required: ["event_id", "action_type", "start_time"],
    indexes: ["action_type", "start_time"],
};
