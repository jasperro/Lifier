/* Settings wordt gebruikt voor instellingen en opslag van XP-gegevens zoals profession en level */
import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";
import databasePromise from "./database";
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

export enum SettingId {
    CurrentXP = "current_xp",
    DarkMode = "dark_mode",
    DbSync = "db_sync",
    XPProfession = "xp_profession",
    AccentColor = "accent_color",
}

export async function getSetting(id: SettingId): Promise<SettingDocument> {
    const database = await databasePromise;
    const settingsCollection = database.settings;

    const query = settingsCollection.findOne().where("id").eq(id);

    let result = await query.exec();

    if (result == null) {
        switch (id) {
            case "current_xp":
                result = await settingsCollection.atomicUpsert({
                    id: id,
                    state: 0,
                });
            case "dark_mode":
                result = await settingsCollection.atomicUpsert({
                    id: id,
                    state: false,
                });
            case "db_sync":
                result = await settingsCollection.atomicUpsert({
                    id: id,
                    state: false,
                });
            case "xp_profession":
            case "accent_color":
                result = await settingsCollection.atomicUpsert({
                    id: id,
                    state: "#0077ce",
                });
        }
    }

    return result!;
}

export type SettingCollection = RxCollection<SettingDocument>;

export default settingSchema;
