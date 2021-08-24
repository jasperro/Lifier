import HTTPAdapter from "pouchdb-adapter-http";
import IndexedDBAdapter from "pouchdb-adapter-idb";
import { createRxDatabase, removeRxDatabase } from "rxdb";
import initializeCollections from "./collections";
import { 
    addPouchPlugin,
    getRxStoragePouch,
} from 'rxdb/plugins/pouchdb';
//import HTTPAdapter from "pouchdb-adapter-http";

//addRxPlugin(HTTPAdapter); // replication
addPouchPlugin(IndexedDBAdapter);
addPouchPlugin(HTTPAdapter);

async function getRxDB() {
    const rxdb = await createRxDatabase({
        name: "database",
        storage: getRxStoragePouch('idb'), // name of the adapter
        multiInstance: true,
    });

    await initializeCollections(rxdb).catch((error) => {
        throw new Error(error);
        try {
            removeRxDatabase("database", getRxStoragePouch('idb'));
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
