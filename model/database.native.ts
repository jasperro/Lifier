import { addRxPlugin, createRxDatabase } from "rxdb";
import * as SQLite from "expo-sqlite";
import SQLiteAdapterFactory from "pouchdb-adapter-react-native-sqlite";
import HTTPAdapter from "pouchdb-adapter-http";
import initializeCollections from "./collections";

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addRxPlugin(SQLiteAdapter);
addRxPlugin(HTTPAdapter);

async function getRxDB() {
    const rxdb = await createRxDatabase({
        name: "database",
        adapter: "react-native-sqlite", // the name of your adapter
        multiInstance: false,
        ignoreDuplicate: true,
    });

    await initializeCollections(rxdb);
    return rxdb;
}

// Haal de value uit de functie

const database = getRxDB();
// Exporteer return value
export default database;
