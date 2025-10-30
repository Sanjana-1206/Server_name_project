const sql = require("mssql");
require("dotenv").config({ path: "./.env" });

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch((err) => {
        console.error("Database Connection Failed!", err);
    });

module.exports = { sql, poolPromise };