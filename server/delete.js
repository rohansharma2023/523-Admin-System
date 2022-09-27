// code for deleting collections
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://rohansh:oajYzKJvFkbqCLOE@cluster0.jcroklm.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("proposal");
  //Delete the "customers" collection:
  dbo.collection("foods").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});