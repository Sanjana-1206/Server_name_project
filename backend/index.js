const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const serviceAdminRoutes = require("./routes/serviceAdmin");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/service-admin", serviceAdminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));