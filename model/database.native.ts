import * as SQLite from "expo-sqlite";
import HTTPAdapter from "pouchdb-adapter-http";
import SQLiteAdapterFactory from "pouchdb-adapter-react-native-sqlite";
import { createRxDatabase, removeRxDatabase } from "rxdb";
import { addPouchPlugin, getRxStoragePouch } from "rxdb/plugins/pouchdb";
import initializeCollections, { MyDatabase } from "./collections";

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addPouchPlugin(SQLiteAdapter);
addPouchPlugin(HTTPAdapter);

async function getRxDB() {
    const rxdb: MyDatabase = await createRxDatabase({
        name: "database",
        storage: getRxStoragePouch("react-native-sqlite"), // the name of your adapter
        multiInstance: false,
        ignoreDuplicate: true,
    });

    await initializeCollections(rxdb).catch((error) => {
        removeRxDatabase("database", getRxStoragePouch("react-native-sqlite"));
        throw new Error(
            "Collections konden niet geïnitialiseerd worden, database wordt gewist"
        );
    });

    return rxdb;
}

// Haal de value uit de functie

const database = getRxDB();

// Exporteer return value
export default database;
