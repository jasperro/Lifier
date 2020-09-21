import { DatabaseAdapter } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "./schema";

export default new LokiJSAdapter({
  schema,
  // migrations, // optional migrations
  useWebWorker: false, // recommended for new projects. tends to improve performance and reduce glitches in most cases, but also has downsides - test with and without it
  useIncrementalIndexedDB: true, // recommended for new projects. improves performance (but incompatible with early Watermelon databases)
  // dbName: 'myapp', // optional db name
  // It's recommended you implement this method:
  // onIndexedDBVersionChange: () => {
  //   // database was deleted in another browser tab (user logged out), so we must make sure we delete
  //   // it in this tab as well
  //   if (checkIfUserIsLoggedIn()) {
  //     window.location.reload()
  //   }
  // },
  // Optional:
  // onQuotaExceededError: (error) => { /* do something when user runs out of disk space */ },
});
