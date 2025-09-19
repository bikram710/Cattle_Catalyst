import React, { useEffect, useState } from "react";
import { getUpcomingAppointments } from "./healthCarerService";

function HealthCarerDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getUpcomingAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2>Healthcare Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              {appt.date} - {appt.petName} (Owner: {appt.ownerName})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HealthCarerDashboard;
