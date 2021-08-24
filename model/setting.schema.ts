/* Settings wordt gebruikt voor instellingen en opslag van XP-gegevens zoals profession en level */
import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import { SettingSchema } from "./setting.type";

export type SettingDocument = RxDocument<SettingSchema>;

const settingSchema: RxJsonSchema<SettingDocument> = {
    version: 0,
    title: "setting schema",
    description: "describes a setting",
    type: "object",
    primaryKey: "id",
    properties: {
        id: {
            type: "string",
        },
        state: {
            type: ["boolean", "number", "string", "null"],
        },
    },
    required: ["id"],
};

export type SettingCollection = RxCollection<SettingDocument>;

export default settingSchema;
