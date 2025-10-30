const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const serviceAdminRoutes = require("./routes/serviceAdmin");

const app = express();
app.use(cors());
app.use(express.json());

// Add a root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Server Name Project API",
    status: "running",
    endpoints: {
      serviceAdmin: "/api/service-admin"
    }
  });
});

// Your routes
app.use("/api/service-admin", serviceAdminRoutes);

// Export for Vercel (REQUIRED!)
module.exports = app;

// Only for local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}