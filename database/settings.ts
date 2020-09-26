import database from "../model/database";

export default async function () {
  await database.action(async () => {
    const postsCollection = database.collections.get("db_test");
    const newPost = await postsCollection.create();
    const allPosts = await postsCollection
      .query()
      .fetch()
      .then((allPosts) => console.log(allPosts));
  });
}
