import PouchDB from "pouchdb";

var db = new PouchDB("dbname");

export function updateXP(transaction: number) {
  // Haal document uit database
  db.get("experience")
    .then(function (doc) {
      console.log(doc);
      // Check of waarde van de totale XP een getal is.
      // Is dit misschien te doen met generic error handling?
      if (doc.total || doc.total == 0) {
        // Voeg score toe aan XP in geheugen
        doc.total += transaction;
      } else {
        console.log("error, invalid value, resetting.");
        // NaN of undefined
        doc.total = 0;
      }
      // Zet de nieuwe gegevens in de database
      return db.put(doc);
    })
    .then(function () {
      // Haal de net-ingestelde waarde weer op van de database
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
