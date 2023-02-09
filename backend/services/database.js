const Pool = require("pg").Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: "qcylvzyz",
    password: process.env.DB_KEY,
    host:process.env.DB_HOST,
    // connectionString:process.env.DB_URI,
    port:process.env.DB_PORT,
    database: "qcylvzyz",
});

module.exports = pool;