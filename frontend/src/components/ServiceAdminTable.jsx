import { useEffect, useState } from "react";
 
function ServiceAdminTable() {
 
  const [data, setData] = useState([]);
 
  const [loading, setLoading] = useState(false);
 
  const [error, setError] = useState(null);
 
  const [serviceId, setServiceId] = useState("15");
 
  const [searchInput, setSearchInput] = useState("15");
 
  const [serviceList, setServiceList] = useState([]);
 
  // 🔹 State for inline editing
 
  const [editingRowId, setEditingRowId] = useState(null);
 
  const [editedData, setEditedData] = useState({});
 
  const fetchServiceNames = () => {
 
    fetch("http://localhost:5000/api/service-admin")
 
      .then((res) => res.json())
 
      .then((data) => {
 
        if (Array.isArray(data)) setServiceList(data);
 
      })
 
      .catch((err) => console.error("Error fetching service list:", err));
 
  };
 
  const fetchServiceData = (id) => {
 
    if (!id) return;
 
    setLoading(true);
 
    setError(null);
 
    fetch(`http://localhost:5000/api/service-admin/${id}`)
 
      .then((res) => {
 
        if (!res.ok) throw new Error("Service not found or server error");
 
        return res.json();
 
      })
 
      .then((data) => {
 
        if (Array.isArray(data)) setData(data);
 
        else setData([]);
 
        setLoading(false);
 
      })
 
      .catch((err) => {
 
        console.error(err);
 
        setError(err.message);
 
        setData([]);
 
        setLoading(false);
 
      });
 
  };
 
  useEffect(() => {
 
    fetchServiceNames();
 
    fetchServiceData(serviceId);
 
  }, [serviceId]);
 
  const handleSearch = () => {
 
    if (searchInput.trim()) {
 
      setServiceId(searchInput.trim());
 
    }
 
  };
 
  const handleKeyPress = (e) => {
 
    if (e.key === "Enter") handleSearch();
 
  };
 
  const handleSelectChange = (e) => {
 
    const selectedId = e.target.value;
 
    setServiceId(selectedId);
 
    setSearchInput(selectedId);
 
  };
 
  // 🔹 Handlers for EDITING actions
 
  const handleEditClick = (row) => {
 
    setEditingRowId(row.service_id);
 
    setEditedData({ ...row }); // Make a copy of the row data for editing
 
  };
 
  const handleCancelClick = () => {
 
    setEditingRowId(null);
 
    setEditedData({});
 
  };
 
  const handleEditChange = (e) => {
 
    const { name, value } = e.target;
 
    setEditedData((prevData) => ({
 
      ...prevData,
 
      [name]: value,
 
    }));
 
  };
 
  const handleSaveClick = async (id) => {
 
    setError(null);
 
    try {
 
      const response = await fetch(`http://localhost:5000/api/service-admin/${id}`, {
 
        method: 'PUT',
 
        headers: {
 
          'Content-Type': 'application/json',
 
        },
 
        body: JSON.stringify(editedData),
 
      });
 
      if (!response.ok) {
 
        throw new Error("Failed to save data. Please check the console.");
 
      }
 
      // Update the main data state to reflect changes immediately
 
      const updatedData = data.map(row => (row.service_id === id ? editedData : row));
 
      setData(updatedData);
 
      // Exit editing mode
 
      setEditingRowId(null);
 
      setEditedData({});
 
    } catch (err) {
 
      console.error("Save Error:", err);
 
      setError(err.message);
 
    }
 
  };
 
 
  return (
<div className="service-admin-container">
<div className="service-admin-header">
<h1 className="service-admin-title">Service Admin Details</h1>
<div className="service-admin-search-box">
<select
 
            className="service-admin-search-input"
 
            value={serviceId}
 
            onChange={handleSelectChange}
>
<option value="">Select Service Name</option>
 
            {serviceList.map((s) => (
<option key={s.service_id} value={s.service_id}>
 
                {s.service_name}
</option>
 
            ))}
</select>
<input
 
            type="number"
 
            value={searchInput}
 
            onChange={(e) => setSearchInput(e.target.value)}
 
            onKeyPress={handleKeyPress}
 
            placeholder="Enter Service ID..."
 
            className="service-admin-search-input"
 
            min="1"
 
          />
<button onClick={handleSearch} className="service-admin-search-button">
 
            Search
</button>
</div>
</div>
 
      {loading && <div className="service-admin-loading-container">...</div>}
 
      {error && <div className="service-admin-error-container"><p>⚠️ {error}</p></div>}
 
      {!loading && !error && data.length === 0 && (
<div className="service-admin-no-data-container"><p>No service found for ID: {serviceId}</p></div>
 
      )}
 
      {!loading && !error && data.length > 0 && (
<div className="service-admin-table-container">
<table className="service-admin-table">
<thead>
<tr>
<th className="service-admin-th">Actions</th>
<th className="service-admin-th">Service ID</th>
<th className="service-admin-th">Service Name</th>
<th className="service-admin-th">Server</th>
<th className="service-admin-th">IVR Server</th>
<th className="service-admin-th">Agent Server</th>
<th className="service-admin-th">Local Extension</th>
<th className="service-admin-th">Default Context</th>
<th className="service-admin-th">Agent Transfer Context</th>
<th className="service-admin-th">Outgoing DID</th>
<th className="service-admin-th">AGI Path</th>
<th className="service-admin-th">Voice File</th>
<th className="service-admin-th">Database IP</th>
<th className="service-admin-th">Database Name</th>
<th className="service-admin-th">SIP Server</th>
</tr>
</thead>
<tbody>
 
              {data.map((d) => (
<tr key={d.service_id} className="service-admin-row">
 
                  {editingRowId === d.service_id ? (
 
                    // 🔹 EDITING MODE ROW
<>
<td className="service-admin-td">
<button onClick={() => handleSaveClick(d.service_id)} className="service-admin-save-button">Save</button>
<button onClick={handleCancelClick} className="service-admin-cancel-button">Cancel</button>
</td>
<td className="service-admin-td">{d.service_id}</td>
<td className="service-admin-td"><input type="text" name="service_name" value={editedData.service_name || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="server" value={editedData.server || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_ivr_server" value={editedData.service_ivr_server || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_agent_server" value={editedData.service_agent_server || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_local_extension" value={editedData.service_local_extension || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_default_context" value={editedData.service_default_context || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_agent_transfer_context" value={editedData.service_agent_transfer_context || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_outgoing_did" value={editedData.service_outgoing_did || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_agi_path" value={editedData.service_agi_path || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_voice_file" value={editedData.service_voice_file || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_database_ip" value={editedData.service_database_ip || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_database_name" value={editedData.service_database_name || ''} onChange={handleEditChange} /></td>
<td className="service-admin-td"><input type="text" name="service_sip_server" value={editedData.service_sip_server || ''} onChange={handleEditChange} /></td>
</>
 
                  ) : (
 
                    // 🔹 VIEW MODE ROW
<>
<td className="service-admin-td">
<button onClick={() => handleEditClick(d)} className="service-admin-edit-button">Edit</button>
</td>
<td className="service-admin-td">{d.service_id}</td>
<td className="service-admin-td">{d.service_name}</td>
<td className="service-admin-td">{d.server}</td>
<td className="service-admin-td">{d.service_ivr_server}</td>
<td className="service-admin-td">{d.service_agent_server}</td>
<td className="service-admin-td">{d.service_local_extension}</td>
<td className="service-admin-td">{d.service_default_context}</td>
<td className="service-admin-td">{d.service_agent_transfer_context}</td>
<td className="service-admin-td">{d.service_outgoing_did}</td>
<td className="service-admin-td">{d.service_agi_path}</td>
<td className="service-admin-td">{d.service_voice_file}</td>
<td className="service-admin-td">{d.service_database_ip}</td>
<td className="service-admin-td">{d.service_database_name}</td>
<td className="service-admin-td">{d.service_sip_server}</td>
</>
 
                  )}
</tr>
 
              ))}
</tbody>
</table>
</div>
 
      )}
</div>
 
  );
 
}
 
export default ServiceAdminTable;