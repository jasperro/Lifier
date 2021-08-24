import _ from "lodash";
import { Platform } from "react-native";
import { RxDatabase } from "rxdb";
import { v4 as uuidv4 } from "uuid";
import eventSchema, {
    EventCollection,
    eventCollectionMethods,
} from "./event.schema";
import settingSchema, { SettingCollection } from "./setting.schema";
import skillSchema, {
    SkillCollection,
    skillCollectionMethods,
    skillDocMethods,
} from "./skill.schema";
import categorySchema, {
    CategoryCollection,
    categoryCollectionMethods,
    categoryDocMethods,
} from "./category.schema";
import taskSchema, {
    TaskCollection,
    taskCollectionMethods,
    taskDocMethods,
} from "./task.schema";

export type DatabaseCollections = {
    skillcategories: CategoryCollection;
    skills: SkillCollection;
    tasks: TaskCollection;
    events: EventCollection;
    settings: SettingCollection;
};

export type MyDatabase = RxDatabase<DatabaseCollections>;

export default async function initializeCollections(
    database: MyDatabase
): Promise<any> {
    await database.addCollections({
        skillcategories: {
            schema: categorySchema,
            statics: categoryCollectionMethods,
            methods: categoryDocMethods,
        },
        skills: {
            schema: skillSchema,
            statics: skillCollectionMethods,
            methods: skillDocMethods,
        },
        tasks: {
            schema: taskSchema,
            statics: taskCollectionMethods,
            methods: taskDocMethods,
        },
        events: {
            schema: eventSchema,
            statics: eventCollectionMethods,
        },
        settings: {
            schema: settingSchema,
        },
    });

    database.skillcategories.preInsert(async function (plainData) {
        //Categorie-ID een verkorte versie van de uuid, omdat er verwacht wordt
        //dat er weinig categorieën gemaakt gaan worden. TODO: Retry bij falen?

        plainData.id = btoa(uuidv4()).replace(/(.{8})..+/, "$1");
        //Genereer categorie met opeenvolgende getallen, werkt niet met sync

        /*const query = categoriesCollection
            .findOne()
            .sort({ id: "desc" });
        const result = await query.exec();
        plainData.id =
            result && result.id
                ? (parseInt(result.id) + 1).toString()
                : "0";*/
    }, false);

    database.skills.preInsert(function (plainData) {
        plainData.id = btoa(uuidv4());
    }, false);

    database.tasks.preInsert(function (plainData) {
        plainData.id = uuidv4();
    }, false);

    database.events.preInsert(function (plainData) {
        const currentTime = Date.now();
        plainData.id = uuidv4();
        if (!plainData.start_time) {
            plainData.start_time = currentTime;
        }
    }, false);

    database.settings.findOne("db_sync").$.subscribe(async (changeEvent) => {
        if (changeEvent == null) {
            changeEvent = await database.settings.atomicUpsert({
                id: "db_sync",
                state: false,
            });
        }
        if (changeEvent.state == true) {
            [
                "settings",
                "skills",
                "tasks",
                "skillcategories",
                "events",
            ].forEach(async (item) => {
                if (Platform.OS == "web") {
                    database[item].sync({
                        remote: `http://192.168.1.16:10102/${item}/`, // Remote database. CouchDB op Raspberry Pi
                        waitForLeadership: true,
                        direction: {
                            pull: true,
                            push: true,
                        },
                        options: {
                            live: true,
                            retry: true,
                        },
                    });
                } else {
                    // Zorgt ervoor dat synchronisatie ook op mobile werkt (bugfix?)
                    setInterval(async () => {
                        database[item].sync({
                            remote: `http://192.168.1.16:10102/${item}/`, // Remote database. CouchDB op Raspberry Pi
                            waitForLeadership: true,
                            direction: {
                                pull: true,
                                push: true,
                            },
                            options: {
                                live: false,
                                retry: false,
                            },
                        });
                    }, 5000);
                }
            });
        }
    });
}
