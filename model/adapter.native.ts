import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";

export default new SQLiteAdapter({
  schema,
  // dbName: 'myapp',
  // migrations,
  synchronous: false, // verbeteringen voor ios is true
  // experimentalUseJSI: true,
});
