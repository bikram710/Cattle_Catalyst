import React, { useState, useEffect } from "react";
import { fetchPawClips, uploadPawClip } from "./pawClipsService";

function PawClipsDashboard() {
  const [clips, setClips] = useState([]);
  const [newClip, setNewClip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadClips() {
      setLoading(true);
      try {
        const data = await fetchPawClips();
        setClips(data);
      } catch (err) {
        setError("Failed to load paw clips.");
      }
      setLoading(false);
    }
    loadClips();
  }, []);

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setNewClip(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!newClip) return;
    setUploading(true);
    setError("");
    try {
      await uploadPawClip(newClip);
      // Reload clips after upload
      const data = await fetchPawClips();
      setClips(data);
      setNewClip(null);
    } catch {
      setError("Upload failed");
    }
    setUploading(false);
  };

  return (
    <div>
      <h2>Paw Clips</h2>
      {loading ? (
        <p>Loading clips...</p>
      ) : clips.length === 0 ? (
        <p>No clips available.</p>
      ) : (
        <ul>
          {clips.map((clip) => (
            <li key={clip.id}>
              <video controls width="320" src={clip.url}></video>
              <p>{clip.title || clip.id}</p>
            </li>
          ))}
        </ul>
      )}
      <input type="file" accept="video/*" onChange={onFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Paw Clip"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default PawClipsDashboard;
