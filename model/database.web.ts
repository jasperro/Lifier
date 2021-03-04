import { createRxDatabase, addRxPlugin, removeRxDatabase } from "rxdb";
import initializeCollections from "./collections";
import IndexedDBAdapter from "pouchdb-adapter-idb";
import { throwError } from "rxjs"; // Vervangen door pouchdb-adapter-indexeddb als pouchdb/pouchdb#8209 gefixt wordt
//import HTTPAdapter from "pouchdb-adapter-http";

//addRxPlugin(HTTPAdapter); // replication
addRxPlugin(IndexedDBAdapter);

async function getRxDB() {
    const rxdb = await createRxDatabase({
        name: "database",
        adapter: "idb", // name of the adapter
        multiInstance: true,
    });

    await initializeCollections(rxdb).catch((error) => {
        try {
            removeRxDatabase("database", "idb");
        } catch (error) {}
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
