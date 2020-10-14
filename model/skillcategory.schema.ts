export default
{
    title: "hero schema",
    version: 0,
    description: "describes a simple hero",
    type: "object",
    properties: {
        name: {
            type: "string",
            primary: true,
        },
        color: {
            type: "string",
        },
        healthpoints: {
            type: "number",
            minimum: 0,
            maximum: 100,
        },
        secret: {
            type: "string",
        },
        birthyear: {
            type: "number",
            final: true,
            minimum: 1900,
            maximum: 2050,
        },
        skills: {
            type: "array",
            maxItems: 5,
            uniqueItems: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    damage: {
                        type: "number",
                    },
                },
            },
        },
    },
    required: ["color"],
};
