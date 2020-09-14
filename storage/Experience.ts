import PouchDB from "pouchdb";

var db = new PouchDB("dbname");

export function updateXP(transaction: number) {
  db.get("experience")
    .then(function (doc) {
      // update their age
      doc.total += transaction;
      // put them back
      return db.put(doc);
    })
    .then(function () {
      // fetch mittens again
      return db.get("experience");
    })
    .then(function (doc) {
      console.log("Set amount of exp to: " + doc.total);
      return doc.total;
    });
  return 0;
}

export function getXP() {
  return db.get("experience");
}
