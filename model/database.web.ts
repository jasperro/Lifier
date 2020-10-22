import { createRxDatabase, removeRxDatabase, addRxPlugin } from 'rxdb'
import initializeCollections from './collections'

addRxPlugin(require('pouchdb-adapter-indexeddb'))

async function getRxDB() {
    const rxdb = await createRxDatabase({
        name: 'database',
        adapter: 'indexeddb', // name of the adapter
    })

    await initializeCollections(rxdb)

    return rxdb
}

// Haal de value uit de functie
const database = getRxDB()
// Exporteer return value
export default database
