// import React from "react";

const Dashboard = () => {
  const clinicData = localStorage.getItem("clinic");
  const clinic = clinicData ? JSON.parse(clinicData) : null;

  if (!clinic) {
    // Redirect logic can be added here if needed
    return <p>Please log in to see the dashboard.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans p-8">
      <h1 className="text-5xl font-extrabold mb-6">Welcome, {clinic.name}</h1>
      <p className="text-lg mb-2"><strong>Email:</strong> {clinic.email}</p>
      <p className="text-lg mb-2"><strong>Domain:</strong> {clinic.domain}</p>
      <p className="text-lg mb-2"><strong>Plan:</strong> {clinic.plan}</p>
      <p className="text-lg mb-8"><strong>Status:</strong> {clinic.isActive ? "Active" : "Inactive"}</p>

      <button
        onClick={() => {
          localStorage.removeItem("clinic");
          window.location.href = "/login";
        }}
        className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
