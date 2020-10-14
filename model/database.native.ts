import { addRxPlugin, createRxDatabase } from "rxdb";
import * as SQLite from "expo-sqlite";
import SQLiteAdapterFactory from "pouchdb-adapter-react-native-sqlite";
import initializeCollections from "./collections";

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addRxPlugin(SQLiteAdapter);
addRxPlugin(require("pouchdb-adapter-http"));

const initializeDB = async () => {
    const rxdb = await createRxDatabase({
        name: "mydatabase",
        adapter: "react-native-sqlite", // the name of your adapter
        ignoreDuplicate: true, // Expo herlaadt database elke keer, en reexport, dit maakt een nieuwe database
        multiInstance: false,
    });

    await initializeCollections(rxdb);
    return rxdb;
};

export default initializeDB;
