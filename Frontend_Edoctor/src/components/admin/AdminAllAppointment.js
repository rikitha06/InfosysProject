import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import "../../CSS/admin/AdminAllAppointment.css";

function AdminAllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch appointments from the backend
    const username = localStorage.getItem("username"); // Fetch the logged-in username
    axios
      .get(`/${username}/admin/appointments`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="admin-all-appointments">
      <h2>All Appointments</h2>
      {isLoading ? (
        <p>Loading appointments...</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor ID</th>
              <th>Patient ID</th>
              <th>Appointment Date & Time</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6">No appointments available.</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.doctor.doctorId}</td>
                  <td>{appointment.patient.patientId}</td>
                  <td>{appointment.appointmentDateTime}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminAllAppointment;
