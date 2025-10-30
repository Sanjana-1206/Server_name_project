import React from "react";
import ServiceAdminTable from "./components/ServiceAdminTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Service Admin Dashboard</h1>
      <ServiceAdminTable />
    </div>
  );
}

export default App;