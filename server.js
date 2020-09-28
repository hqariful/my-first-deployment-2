const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const Datastore = require("nedb");
const { nextTick } = require("process");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = new Datastore("database");
db.loadDatabase();

app.set("view-engine", "ejs");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
var name;
app.get("/", checkData, (req, res) => {
  console.log("worked");
});

function checkData(req, res, next) {
  db.find({}, (err, docs) => {
    console.log(docs);
    res.render("index.ejs", { list: JSON.stringify(docs) });
  });
  next();
}

app.post("/post", urlencodedParser, (req, res) => {
  const data = {
    name: req.body.name,
  };
  res.send(data);
  db.insert(data);
});
