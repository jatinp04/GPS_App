require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const async = require("async"); //make sures to return a promise when used before a function 
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //Cross origion resource sharing , allow restricted resource to be accessed from other domain
const port = process.env.BACKEND_PORT; //Backend Port Running on 5001
const secretKey = process.env.JWT_SECRET;
const pool = require("./services/database");
const bcrypt = require("bcrypt");
const verify = require("./services/authService");

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

app.get("/api/v1/devices",(req, res) => {
  let query = "select * from devices";
  const orderKey = (req.query && req.query.orderKey) || false;
  const offset = (req.query && req.query.offset) || false;
  const dev_id = (req.query && req.query.dev_id) || false;
  // console.log(dev_id);
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

  if (!dev_id) {
    query = query + " limit 5";
  } else {
    query = `${query} where devices_id='${dev_id}'`;
  }
  //   console.log(query);
  if (offset) {
    query = `${query} offset  ${offset}`;
  }

  console.log("query: ", query);

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





app.get("/api/v1/count", (req, res) => {
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

//Register API
/*
app.post("/signup", (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2,
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be a least 6 characters long" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    hashedPassword = bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    async.auto(
      {
        signupUsers: function (cb) {
          pool.query(
            `SELECT * FROM users
            WHERE email = $1`,
            [email],
            (err, results) => {
              if (err) {
                console.log(err);
              }
              console.log(results.rows);

              if (results.rows.length > 0) {
                return res.render("register", {
                  message: "Email already registered",
                });
              } else {
                pool.query(
                  `INSERT INTO users (name, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING id, password`,
                  [name, email, hashedPassword]
                );
              }
            }
          );
        },
      },
      function (err, results) {
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results.rows);
          req.flash("success_msg", "You are now registered. Please log in");
          res.redirect("/");
        };
      }
    );
  }
});
*/

//SignUp Request

app.post("/api/v1/signup", (req, res) => {
  let { email, password } = req.body;
  // let hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  // console.log(req.body)

  async.auto(
    {
      alreadyExists: (cb) => {
        // console.log(cb);
        pool.query(
          `select * from users where email=$1`,
          [email],
          (err, docs) => {
            if (err) {
              return cb(err);
            }
            if (docs && docs.rowCount) {
              return cb(null, true);
            }
            console.log(docs.rowCount);
            return cb(null, false);
          }
        );
      },
      hashedPass: [
        "alreadyExists",
        function (results, cb) {
          console.log(results.alreadyExists);
          // console.log(cb);
          if (results.alreadyExists) {
            return cb("Email already Exsits");
          }
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              if (err) {
                return cb(err);
              }
              return cb(null, hash);
            });
          });
        },
      ],

      signupCheck: [
        "hashedPass",
        function (results, cb) {
          // if (results.alreadyExists) {
          //   return cb("Email already Exsits");
          // }
          if (!results.hashedPass) {
            return cb("Hash Not Generated");
          }

          req.body.authToken = jwt.sign(req.body, secretKey);

          pool.query(
            `insert into users(email ,password,authtoken) values ($1,$2,$3)`,
            [email, results.hashedPass, req.body.authToken],
            (err, docs) => {
              if (err) {
                return cb(err);
              }
              return cb(null, docs);
            }
          );
        },
      ],
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.send("SignUp Successfull!");
    }
  );
});

//Login

app.post("/api/v1/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).send("Email or Password not Received");
  }
  async.auto(
    {
      loginCheck: function (cb) {
        pool.query(
          `select password from users where email=$1 `,
          [email],
          async (err, docs) => {
            if (err) {
              return cb(err);
            }
            if (docs && docs.rowCount) {
              // console.log(docs.rows[0]);
              // let comparePass =await bcrypt.compare(password,docs.rows[0].password)
              // console.log(comparePass);

              return cb(null, docs.rows[0]);
            }
            return cb(null, false);
          }
        );
      },

      byCryptPassCheck: [
        "loginCheck",

        (results, cb) => {
          // console.log(cb);
          if (!results.loginCheck) {
            return res.status(403).send("Email ID Does Not Exsist!");
          }
          const hashPass = results.loginCheck.password || false;
          // console.log(results.loginCheck);

          bcrypt.compare(password, hashPass, (err, passReceived) => {
            if (!passReceived) {
              return cb(null, false);
            }
            var token = jwt.sign(
              {
                email: results.loginCheck.email,
                password: results.loginCheck.password,
              },
              secretKey
            );
            // console.log(token);
            return cb(null, token);
          });
        },
      ],
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      if (!results.byCryptPassCheck) {
        return res.status(403).send("Unable to Login");
      }
      console.log(results.byCryptPassCheck);
      return res
        .cookie("authToken", results.byCryptPassCheck, {
          httpOnly: true,
          SameSite:None,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        .send("Login SuccessFull");
    }
  );
});

//logout
app.get("/api/v1/logout", (req, res) => {
  res
    .cookie("authToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .send("Succesfully logged Out!");
});

app.listen(port, () => {
  console.log("Running on Port: ", port);
});
