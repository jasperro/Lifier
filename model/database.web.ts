import { createRxDatabase, addRxPlugin } from "rxdb";
import initializeCollections from "./collections";
import IndexedDBAdapter from "pouchdb-adapter-indexeddb";

addRxPlugin(IndexedDBAdapter);

async function getRxDB() {
    const rxdb = await createRxDatabase({
        name: "database",
        adapter: "indexeddb", // name of the adapter
        multiInstance: true,
    });

    await initializeCollections(rxdb);

    return rxdb;
}

// Haal de value uit de functie
const database = getRxDB();
// Exporteer return value
export default database;
