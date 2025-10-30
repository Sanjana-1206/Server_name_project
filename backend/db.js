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
        enableArithAbort: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 30000,
    requestTimeout: 30000,
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log("✅ Connected to SQL Server");
        return pool;
    })
    .catch((err) => {
        console.error("❌ Database Connection Failed!", err);
        // ✅ Log connection details for debugging (without password)
        console.error("Connection Config:", {
            server: process.env.DB_SERVER,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER
        });
        throw err; // ✅ Throw error so it's visible
    });

module.exports = { sql, poolPromise };