// import Formation from "../interfaces/formations";
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.HOST_SERVER,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 100,
});

// module.exports = pool.promise();

export default pool.promise();
