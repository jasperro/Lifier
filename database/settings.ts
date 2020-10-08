import { Q } from "@nozbe/watermelondb";
import database from "../model/database";

export async function setSettingState(
    settingID: string,
    value: number | boolean | string,
) {
    await database.action(async () => {
        const settingCollection = database.collections.get("settings");
        const settingObject = () => {
            const setting = {};
            setting.settingID = settingID;

            if (typeof value === "boolean") {
                setting.boolValue = value;
            } else if (typeof value === "number") {
                setting.numValue = value;
            } else if (typeof value === "string") {
                setting.strValue = value;
            }
            return setting;
        };

        const updatedSetting = await settingCollection
            .query(Q.where("setting_id", settingID))
            .fetch()
            .then(async (allSettings) => {
                const setting = await settingCollection.find(allSettings[0].id);
                return await setting.update(settingObject);
            }).catch(async (error) => await settingCollection.create(settingObject));
        console.log(updatedSetting);
    });
}

export async function getSettingState(settingID: string) {
    return await database.action(async () => {
        const settingCollection = database.collections.get("settings");
        const allSettings = await settingCollection
            .query(Q.where("setting_id", settingID))
            .fetch()
            .then((allSettings) =>
            /*        for (const setting of allSettings) {
          console.log(setting.id);
        } */
                allSettings);
        return allSettings[0];
    });
}
