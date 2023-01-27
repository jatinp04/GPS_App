require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const async = require("async");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.BACKEND_PORT; //Backend Port Running on 5001
const secretKey = process.env.JWT_SECRET;
const pool = require("./services/database");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: true,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(cookieParser());

//GET Request Fetch table from DB

app.get("/devices", (req, res) => {
  let query = "select * from devices";
  const orderKey = (req.query && req.query.orderKey) || false;
  const offset = (req.query && req.query.offset) || false;
  const orderBy = (req.query && req.query.orderBy) || false;
  //   console.log(req.query)

  //   let input = req.query.searchInput;
  //   input = input.toLowerCase()
  //   query = query + " where devices_id like '" + input + "%' or device_type like '"+ input+"%'";
  //   console.log(query);

  if (orderKey) {
    query = `${query} order by ${orderKey}`;
    if (orderBy) {
      query = `${query} ${orderBy}`;
    }
  }

  query = query + " limit 5";
  //   console.log(query);
  if (offset) {
    query = `${query} offset  ${offset}`;
  }

//   console.log("query: ", query);

  async.auto(
    {
      devices: function (cb) {
        pool.query(query, function (err, device_docs) {
          // console.log(device_docs);
          if (err) {
            return cb(err);
          }
          return cb(null, device_docs.rows);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.devices });
    }
  );
});

app.get("/count", (req, res) => {
  let tableName = req.query.tableKey || false;
  if (!tableName) {
    return res.status(401).send("Invalid Table Name");
  }
  let query = `select count(*) from ${tableName}`;
  async.auto(
    {
      getRowCount: function (cb) {
        pool.query(query, function (err, docs) {
          //   console.log(rows);
          if (err) {
            return cb(err);
          }
          return cb(null, docs.rows[0].count);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.getRowCount });
    }
  );
});

app.listen(port, () => {
  console.log("Running on Port: ", port);
});
