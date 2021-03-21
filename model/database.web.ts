import HTTPAdapter from "pouchdb-adapter-http";
import IndexedDBAdapter from "pouchdb-adapter-idb";
import { addRxPlugin, createRxDatabase, removeRxDatabase } from "rxdb";
import initializeCollections from "./collections";
//import HTTPAdapter from "pouchdb-adapter-http";

//addRxPlugin(HTTPAdapter); // replication
addRxPlugin(IndexedDBAdapter);
addRxPlugin(HTTPAdapter);

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
