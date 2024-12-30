import React, { useState } from "react";
import api from "../../services/api";

function AdminDeleteDoctor() {
  const [doctorId, setDoctorId] = useState("");

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      api
        .delete(`${localStorage.getItem("username")}/admin/doctorDelete/${doctorId}`)
        .then(() => {
          alert("Doctor deleted successfully.");
          setDoctorId("");
        })
        .catch((error) => {
          console.error("Error deleting doctor:", error);
          alert("Error deleting doctor. Please try again.");
        });
    }
  };

  return (
    <div className="doctor-page">
      <h1>Delete Doctor</h1>
      <input
        type="text"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Doctor</button>
    </div>
  );
}

export default AdminDeleteDoctor;
