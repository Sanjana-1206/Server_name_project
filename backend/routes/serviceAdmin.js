// routes/serviceAdmin.js
const express = require("express");
const router = express.Router();
const { poolPromise,sql } = require("../db");

router.get("/", async (req, res) => {
 try {
   const pool = await poolPromise;
   const result = await pool.request().query(`
     SELECT service_id, service_name
     FROM  CTI_services
     ORDER BY service_name ASC
   `);
   res.json(result.recordset);
 } catch (error) {
   console.error("Error fetching services:", error);
   res.status(500).json({ message: "Error fetching services" });
 }
});

router.get("/:id", async(req, res) => {
    try {
        const pool = await poolPromise;

        const id = parseInt(req.params.id); // e.g., 15
        const result = await pool.request()
            .input("service_id",sql.Int, id) // replace 'param1' with the actual SP parameter name
            .execute("usp_snj_service_admin");

        console.log(result.recordset); // rows returned from CTI_Services
        res.json(result.recordset);

    } catch (err) {
        console.error("SQL Error:", err);
        res.status(500).json({ error: err.message });
    }
});
// routes/serviceAdmin.js

// ... (keep your existing GET routes)

// 🔹 ADD THIS NEW ROUTE for updating a service

// routes/serviceAdmin.js

router.put("/:id", async (req, res) => {

  try {

    const pool = await poolPromise;

    const id = parseInt(req.params.id);

    const updatedService = req.body;

    console.log("Incoming update request for ID:", id, updatedService);

    const request = pool.request();

    // Pass all the service details as parameters to the stored procedure

    request.input("service_id", sql.Int, id);

    request.input("service_name", sql.VarChar, updatedService.service_name);

    // 👇 THIS IS THE MOST LIKELY LINE WITH THE TYPO. ENSURE IT MATCHES.

    request.input("service_server_ip", sql.VarChar, updatedService.service_server_ip);

    request.input("service_outdialing_code", sql.VarChar, updatedService.service_outdialing_code);

    request.input("Non_Toll_Free_Number", sql.VarChar, updatedService.Non_Toll_Free_Number);

    request.input("Toll_Free_Number", sql.VarChar, updatedService.Toll_Free_Number);

    request.input("service_database_ip", sql.VarChar, updatedService.service_database_ip);

    request.input("service_database_name", sql.VarChar, updatedService.service_database_name);

    request.input("service_sip_server", sql.VarChar, updatedService.service_sip_server);

    request.input("service_ivr_server", sql.VarChar, updatedService.service_ivr_server);

    request.input("service_agent_server", sql.VarChar, updatedService.service_agent_server);

    request.input("service_local_extension", sql.VarChar, updatedService.service_local_extension);

    request.input("service_default_context", sql.VarChar, updatedService.service_default_context);

    request.input("service_agent_transfer_context", sql.VarChar, updatedService.service_agent_transfer_context);

    request.input("service_outgoing_did", sql.VarChar, updatedService.service_outgoing_did);

    request.input("service_agi_path", sql.VarChar, updatedService.service_agi_path);

    request.input("service_voice_file_path", sql.VarChar, updatedService.service_voice_file_path);

    request.input("service_recording_path_in", sql.VarChar, updatedService.service_recording_path_in);

    request.input("service_recording_path_out", sql.VarChar, updatedService.service_recording_path_out);

    request.input("service_music_on_hold", sql.VarChar, updatedService.service_music_on_hold);

    request.input("service_server_name", sql.VarChar, updatedService.service_server_name);

    request.input("service_backup_server", sql.VarChar, updatedService.service_backup_server);

    request.input("service_backup_did", sql.VarChar, updatedService.service_backup_did);

    request.input("service_backup_ivr_server", sql.VarChar, updatedService.service_backup_ivr_server);

    request.input("service_channel_count", sql.Int, updatedService.service_channel_count);

    request.input("service_channel_provider", sql.VarChar, updatedService.service_channel_provider);

    // Execute the update procedure

    await request.execute("usp_snj_service_admin_Update");

    res.status(200).json({ message: `Service with ID ${id} updated successfully.` });

  } catch (err) {

    console.error("SQL Error on Update:", err);

    res.status(500).json({ error: "Failed to update service.", details: err.message });

  }

});

 


 

module.exports = router;