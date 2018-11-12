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

    //insert orders table
    var order_id = 1;
    con.query("SELECT max(order_id) as max FROM orders", (err, result) => {
      if (result.length != 0) order_id = parseInt(result[0].max) + 1;
    });
    con.query(
      `INSERT INTO orders VALUES (${order_id},${new Date()},${temp.cus_id})`,
      (err, result) => {
        if (err) throw err;
      }
    );

    // for each item
    for (var i = 0; i < temp.items.length; i++) {
      // insert model table
      var model_id = 1;
      var model_price = 10000; //TO EDIT
      con.query("SELECT max(model_id) as max FROM model", (err, result) => {
        if (result.length != 0) model_id = parseInt(result[0].max) + 1;
      });
      con.query(
        `INSERT INTO model VALUES (${model_id},${model_price},${
          temp.items[i].model_name
        },${temp.items[i].blueprint},${temp.cus_id})`,
        (err, result) => {
          if (err) throw err;
        }
      );

      // insert contain table
      con.query(
        `INSERT INTO contain VALUES (${order_id},${model_id},${temp.amount})`,
        (err, result) => {
          if (err) throw err;
        }
      );
    }
  });
});

//UPDATE	Admin accept order from client
app.post("/update", (req, res) => {
  var temp = req.body;
  con.connect(err => {
    if (err) throw err;
    // insert accept table
    con.query(
      `INSERT INTO accept VALUES (${temp.admin_username},${temp.order_id})`
    );
    con.query(
      `INSERT INTO quotation VALUES (${temp.order_id},${new Date()},${
        temp.quo_price
      })`
    );
  });
});

//UPDATE	Admin update model price
app.post("/updateprice", (req, res) => {
  con.connect(err => {
    if (err) throw err;
    con.query(
      `UPDATE model SET model_price = ${
        req.body.model_price
      } WHERE model_id = ${req.body.model_id}`
    );
  });
});

//DELETE	Client cancel recieved quotation
app.post("/delete", (req, res) => {
  //ToDo Sun
  con.connect(err => {
    if (err) throw err;
<<<<<<< HEAD
    con.query(
      "DELETE FROM orders WHERE order_id = '${req.body.order_id}' ",
      function(err, result) {
        if (err) throw err;
        console.log("deleted...");
      }
    );
=======
    con.query('DELETE FROM orders WHERE order_id = ${req.body.order_id}', function (err, result) {
      if (err) throw err;
      console.log("deleted...");
    });
>>>>>>> d7fd198a5839788c54b59c5ed12bdedbcb1ad543
  });
});

//QUERY	Order list
app.get("/select", (req, res) => {
  /*con.connect(err => {
    if (err) throw err;
    con.query("SELECT * FROM boats", (err, result) => {
      //console.log(parseInt(result[0].max) + 1);
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(result));
    });
  });*/

  //ToDo Sun
  con.connect(err => {
    if (err) throw err;
<<<<<<< HEAD
    con.query(
      `SELECT * FROM orders WHERE cus_id_orders = ${req.body.cus_id_orders}`,
      (err, result) => {
        console.log(result[0].bid);
        res.setHeader("Content-type", "application/json");
        res.send(JSON.stringify(result));
      }
    );
=======
    var x = 'SELECT O.order_id,O.order_date,C.client_name FROM orders O,client C WHERE C.cus_id=${req.body.cus_id_orders} AND C.cus_id=O.cus_id_orders';
    con.query(x, (err, result) => {
      //console.log(result[0].bid);
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(result));
    });
>>>>>>> d7fd198a5839788c54b59c5ed12bdedbcb1ad543
  });
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
