// Database maken
/*import { Database } from "@nozbe/watermelondb";
import adapter from "./adapter"; // Sqlite op android/ios, loki op web

// Importeer modellen, dit is alles in de app die data opgeslagen heeft in de db.
import SkillCategory from "./SkillCategory";
import Skill from "./Skill";
import AchieveHistoryItem from "./AchieveHistory";
import TimeHistoryItem from "./TimeHistory";
import Setting from "./Setting";

// Exporteer de database dat de rest van de app het kan lezen
export default new Database({
  adapter,
  modelClasses: [
    SkillCategory,
    Skill,
    AchieveHistoryItem,
    TimeHistoryItem,
    Setting,
  ],
  actionsEnabled: true,
});*/

import { addRxPlugin, createRxDatabase } from 'rxdb';
import initializeCollections from "./collections";
import * as SQLite from 'expo-sqlite';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)

addRxPlugin(SQLiteAdapter);
addRxPlugin(require('pouchdb-adapter-http'));

async function getRxDB() {
  const rxdb = await createRxDatabase({
    name: 'mydatabase',
    adapter: 'react-native-sqlite', // the name of your adapter
    ignoreDuplicate: true, // Expo herlaadt database elke keer, en reexport, dit maakt een nieuwe database
    multiInstance: false
  });

  await initializeCollections(rxdb);
  return rxdb;
}

// Haal de value uit de functie
const database = getRxDB();
// Exporteer return value
export default database;