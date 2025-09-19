import React, { useEffect, useState } from "react";
import { getPoints, addPoints } from "./pointsService";

function PointsDashboard() {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPoints() {
      try {
        const pts = await getPoints();
        setPoints(pts);
      } catch (err) {
        setError("Error fetching points.");
      } finally {
        setLoading(false);
      }
    }
    loadPoints();
  }, []);

  const handleAddPoints = async () => {
    try {
      const newPoints = await addPoints(10); // add 10 points
      setPoints(newPoints);
    } catch {
      setError("Error adding points.");
    }
  };

  if (loading) return <p>Loading points...</p>;

  return (
    <div>
      <h2>Your Points: {points}</h2>
      <button onClick={handleAddPoints}>Add 10 Points</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PointsDashboard;
