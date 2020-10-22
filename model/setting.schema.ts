export default {
    title: 'setting',
    version: 0,
    description: 'describes a setting',
    type: 'object',
    properties: {
        bool_state: {
            type: 'boolean',
            default: false,
        },
        setting_id: {
            type: 'string',
            primary: true,
        },
    },
    required: ['setting_id'],
}
