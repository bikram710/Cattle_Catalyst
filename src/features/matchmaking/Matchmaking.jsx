import React, { useState, useEffect } from "react";
import { fetchMatches } from "./matchmakingService";

function Matchmaking() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMatches() {
      try {
        const data = await fetchMatches();
        setMatches(data);
      } catch (err) {
        setError("Failed to load matches.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Pet Matchmaking</h2>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              {match.name} - Breed: {match.breed}, Age: {match.age} years
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Matchmaking;
