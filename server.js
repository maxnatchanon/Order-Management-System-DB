const express = require("express");
const parser = require("body-parser");
const app = express();
const path = require("path");
const mysql = require("mysql");
const port = 3000;

app.use(parser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "boatrental"
});

//INSERT	Client send order to company
app.post("/insert", (req, res) => {
  console.log(`insert\n${req.body}`);
  var temp = req.body;
  con.connect(err => {
    if (err) throw err;
    con.query("INSERT INTO", (err, result) => {
      if (err) throw err;
    });
  });
});

//UPDATE	Admin accept order from client
app.post("/update", (req, res) => {});

//DELETE	Client cancel recieved quotation
app.post("delete", (req, res) => {
  //ToDo Sun
});

//QUERY	Order list
app.get("/select", (req, res) => {
  /*
  con.connect(err => {
    if (err) throw err;
    con.query("SELECT * FROM boats", (err, result) => {
      console.log(result[0].bid);
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(result));
    });
  });
  */
  //ToDo Sun
});

/*
Send HTML file to show on web browser
*/
// First Page
app.get("/", (req, res) => {
  console.log(path.join(__dirname + "/test.html"));
  res.sendFile(path.join(__dirname + "/test.html"));
});

app.listen(port, () => console.log(`listening on port ${port}`));
