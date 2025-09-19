import React, { useState, useEffect } from "react";
import { fetchSettings, saveSettings } from "./settingsService";

function SettingsDashboard() {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
    language: "en",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await saveSettings(settings);
      setMessage("Settings saved!");
    } catch (err) {
      setMessage("Failed to save settings.");
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div>
      <h2>User Settings</h2>
      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
        />
        Enable Notifications
      </label>
      <br />
      <label>
        Theme:
        <select name="theme" value={settings.theme} onChange={handleChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <br />
      <label>
        Language:
        <select name="language" value={settings.language} onChange={handleChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </label>
      <br />
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Settings"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SettingsDashboard;
