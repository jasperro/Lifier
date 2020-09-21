import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";

// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
export default new SQLiteAdapter({
  schema,
  // dbName: 'myapp', // optional database name or file system path
  // migrations, // optional migrations
  synchronous: true, // synchronous mode only works on iOS. improves performance and reduces glitches in most cases, but also has some downsides - test with and without it
  // experimentalUseJSI: true, // experimental JSI mode, use only if you're brave
});
