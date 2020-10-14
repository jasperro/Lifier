import { createRxDatabase, removeRxDatabase, addRxPlugin } from "rxdb";
import initializeCollections from "./collections";

addRxPlugin(require("pouchdb-adapter-indexeddb"));

const initializeDB = async () => {
    const rxdb = await createRxDatabase({
        name: "database",
        adapter: "indexeddb", // name of the adapter
    });

    await initializeCollections(rxdb);

    return rxdb;
};

export default initializeDB;
