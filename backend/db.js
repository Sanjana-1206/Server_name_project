const sql = require("mssql");
require("dotenv").config({ path: "./.env" });

// Log environment variables (for debugging)
console.log("🔍 Database Config Check:", {
    hasUser: !!process.env.DB_USER,
    hasPassword: !!process.env.DB_PASSWORD,
    hasServer: !!process.env.DB_SERVER,
    hasPort: !!process.env.DB_PORT,
    hasDatabase: !!process.env.DB_NAME,
    server: process.env.DB_SERVER, // See what server it's trying to connect to
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
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

console.log("🔌 Attempting to connect to SQL Server...");

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log("✅ Connected to SQL Server successfully!");
        return pool;
    })
    .catch((err) => {
        console.error("❌ Database Connection Failed!");
        console.error("Error details:", err);
        console.error("Error code:", err.code);
        console.error("Error message:", err.message);
        // Return a rejected promise instead of undefined
        return Promise.reject(err);
    });

module.exports = { sql, poolPromise };