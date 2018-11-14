const express = require("express");
const parser = require("body-parser");
const app = express();
const path = require("path");
const mysql = require("mysql");
const port = 3000;

app.use(parser.json());
app.use(express.static("./"));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "company_project"
});

//INSERT	Client send order to company
app.post("/insert", (req, res) => {
  console.log("Insert start");
  if (con._connectCalled) {
    console.log("con._connectCalled");
    con.end();
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "company_project"
    });
  }
  if (!con._connectCalled) {
    console.log(`insert\n${req.body}`);
    var temp = req.body;
    var order_id = 1;
    var sw = 0;
    con.connect(err => {
      if (err) throw err;

      //insert orders table
      con.query("SELECT max(order_id) as max FROM orders", (err, result) => {
        if (result.length != 0) order_id = parseInt(result[0].max) + 1;
        if (isNaN(order_id)) order_id = 1;
        con.query(
          `INSERT INTO orders VALUES (${order_id},NOW(),${
            temp.cus_id
          },'New order')`,
          (err, result) => {
            if (err) throw err;
            console.log("jui1");

            // insert model table
            var model_id = 1;
            var model_price = 0; //TO EDIT

            con.query(
              "SELECT max(model_id) as max FROM model",
              (err, result) => {
                if (result.length != 0) model_id = parseInt(result[0].max) + 1;
                if (isNaN(model_id)) model_id = 1;
                var model = [];
                for (var i = 0; i < temp.items.length; i++) {
                  model.push([
                    model_id + i,
                    model_price,
                    temp.items[i].model_name,
                    "",
                    parseInt(temp.cus_id)
                  ]);
                }
                console.log(model);
                con.query(
                  "INSERT INTO model VALUES?",
                  [model],
                  (err, result) => {
                    if (err) throw err;
                    console.log("jui2");
                  }
                );

                var model2 = [];
                for (var i = 0; i < temp.items.length; i++) {
                  model2.push([order_id, model_id + i, temp.items[i].amount]);
                }
                console.log(model2);
                con.query(
                  "INSERT INTO contain VALUES?",
                  [model2],
                  (err, result) => {
                    if (err) throw err;
                    console.log("jui3");
                  }
                );
              }
            );
          }
        );
      });
    });
  }
});

// UPDATE blueprint
// TODO: Check pls
app.post("/updateblueprint", (req, res) => {
  if (con._connectCalled) {
    con.end();
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "company_project"
    });
  }
  if (!con._connectCalled) {
    var temp = req.body;
    con.connect(err => {
      if (err) throw err;
      // Update blueprint
      con.query(
        `UPDATE model SET blueprint = '' WHERE model_name = ${temp.model_name}`
      );
    });
  }
});

//UPDATE	Admin accept order from client
app.post("/update", (req, res) => {
  var temp = req.body;
  if(con._connectCalled){
    con.end();
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "company_project"
    });
  }
  if(!con._connectCalled){
    con.connect(err => {
      if (err) throw err;
      // insert accept table
      con.query(
        `INSERT INTO accept VALUES ('${temp.admin_username}',${temp.order_id})`
      );
      con.query(
        `INSERT INTO quotation VALUES (${temp.order_id},NOW(),${temp.quo_price})`
      );
      con.query(
        `UPDATE orders SET order_status = 'Quotation sent' WHERE order_id = ${
          temp.order_id
        }`
      );
    });
  }
});

//UPDATE	Admin update model price
app.post("/updateprice", (req, res) => {
  if (con._connectCalled) {
    con.end();
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "company_project"
    });
  }
  if (!con._connectCalled) {
    con.connect(err => {
      if (err) throw err;
      con.query(
        `UPDATE model SET model_price = ${
          req.body.model_price
        } WHERE model_id = ${req.body.model_id}`
      );
    });
  }
});

//DELETE	Client cancel recieved quotation
app.post("/delete", (req, res) => {
  //ToDo Sun
  con.connect(err => {
    if (err) throw err;
    con.query(
      `DELETE FROM orders WHERE order_id = ${req.body.order_id}`,
      function(err, result) {
        if (err) throw err;
        console.log("deleted...");
      }
    );
  });
});

//QUERY	Order list
app.get("/select", (req, res) => {
  //ToDo Sun
  con.connect(err => {
    if (err) throw err;
    var x = `SELECT O.order_id,O.order_date,C.client_name FROM orders O,client C WHERE C.cus_id=${
      req.body.cus_id
    } AND C.cus_id=O.cus_id_orders`;
    con.query(x, (err, result) => {
      //console.log(result[0].bid);
      res.setHeader("Content-type", "application/json");
      res.send(JSON.stringify(result));
    });
  });
});

app.get("/selectadmin", (req, res) => {
  if (con._connectCalled) {
    con.end();
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "company_project"
    });
  }
  if (!con._connectCalled) {
    con.connect(err => {
      if (err) throw err;
      var x = `SELECT order_id ,order_date, order_status ,cus_name  FROM orders LEFT JOIN customer_company ON customer_company.cus_id = orders.cus_id ;`;
      con.query(x, (err, result) => {
        //console.log(result);
        //res.setHeader("Content-type", "application/json");
        res.send(JSON.stringify(result));
      });
    });
  }
});

//get model_id from related order_id
app.get("/selectorder", (req, res) => {
  if (con._connectCalled) {
    con.end();
    con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "company_project"
    });
  }
  if (!con._connectCalled) {
    con.connect(err => {
      if (err) throw err;
      //console.log(req.query.orderId);
      var y = `SELECT M.model_name,M.model_id,M.blueprint FROM contain C,model M WHERE C.order_id=${
        req.query.orderId
      } AND C.model_id=M.model_id`;
      //console.log(y);
      con.query(y, (err, result) => {
        console.log(JSON.stringify(result));
        //res.setHeader("Content-type", "application/json");
        res.send(JSON.stringify(result));
      });
    });
  }
});

/*
Send HTML file to show on web browser
*/
// First Page
app.get("/", (req, res) => {
  console.log(path.join(__dirname + "/test.html"));
  res.sendFile(path.join(__dirname + "/test.html"));
});

app.get("/sendorder", (req, res) => {
  console.log(path.join(__dirname + "/html/send_order.html"));
  res.sendFile(path.join(__dirname + "/html/send_order.html"));
});

app.get("/allorder", (req, res) => {
  console.log(path.join(__dirname + "/html/all_order.html"));
  res.sendFile(path.join(__dirname + "/html/all_order.html"));
});
app.get("/confirm_price", (req, res) => {
  console.log(path.join(__dirname + "/html/confirm_price.html"));
  res.sendFile(path.join(__dirname + "/html/confirm_price.html"));
});

app.listen(port, () => console.log(`listening on port ${port}`));
