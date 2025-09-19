import React, { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // Profile state
  const [profile, setProfile] = useState({
    fullName: "",
    profilePhoto: "",
    gender: "",
    dateOfBirth: "",
    location: "",
    interests: "",
    bio: "",
    phone: "",
    occupation: "",
    petHealth: "",
    preferredHealthcareProviders: "",
    points: 0,
    pawClips: "",
  });

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileMessage, setProfileMessage] = useState("");

  // Logout handler
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      try {
        const notificationsRef = collection(db, "notifications");
        const q = query(
          notificationsRef,
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const notes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notes);
        console.log("Fetched notifications:", notes.length);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [user]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
        setProfileLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  // Handle profile input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile to Firestore
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage("");
    try {
      const docRef = doc(db, "profiles", user.uid);
      await setDoc(
        docRef,
        {
          ...profile,
          points: Number(profile.points), // ensure points is a number
        },
        { merge: true }
      );
      setProfileMessage("Profile saved successfully!");
    } catch (error) {
      setProfileMessage("Error saving profile: " + error.message);
    }
  };

  if (loading || profileLoading) return <p>Loading user info...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1>Welcome, {user?.email}!</h1>
      <p>User ID: {user?.uid}</p>
      <button
        onClick={handleLogout}
        style={{ padding: "8px 16px", marginTop: 20, marginBottom: 20 }}
      >
        Logout
      </button>
      {/* Breed Recognition Button */}
      <button
        onClick={() => navigate("/breed-recognition")}
        style={{ padding: "10px 20px", marginBottom: 40 }}
      >
        Breed Recognition
      </button>
      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} style={{ marginBottom: 40 }}>
        <h2>Your Profile</h2>
        <label>
          Full Name:
          <input
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Profile Photo URL:
          <input
            name="profilePhoto"
            value={profile.profilePhoto}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <select name="gender" value={profile.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Date of Birth:
          <input
            name="dateOfBirth"
            type="date"
            value={profile.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input name="location" value={profile.location} onChange={handleChange} />
        </label>
        <label>
          Interests (comma separated):
          <input
            name="interests"
            value={profile.interests}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={profile.bio} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input name="phone" value={profile.phone} onChange={handleChange} />
        </label>
        <label>
          Occupation:
          <input name="occupation" value={profile.occupation} onChange={handleChange} />
        </label>
        <label>
          Pet Health (vaccinations, conditions):
          <textarea
            name="petHealth"
            value={profile.petHealth}
            onChange={handleChange}
          />
        </label>
        <label>
          Preferred Healthcare Providers (comma separated):
          <input
            name="preferredHealthcareProviders"
            value={profile.preferredHealthcareProviders}
            onChange={handleChange}
          />
        </label>
        <label>
          Points:
          <input
            name="points"
            type="number"
            value={profile.points}
            onChange={handleChange}
          />
        </label>
        <label>
          Paw Clips (comma separated):
          <input
            name="pawClips"
            value={profile.pawClips}
            onChange={handleChange}
          />
        </label>
        <button type="submit" style={{ marginTop: 15 }}>
          Save Profile
        </button>
        {profileMessage && <p>{profileMessage}</p>}
      </form>
      {/* Notifications */}
      <h2>Recent Activity</h2>
      {notifications.length === 0 ? (
        <p>No recent notifications.</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li key={note.id}>
              <strong>
                {new Date(note.date.seconds * 1000).toLocaleDateString()}:
              </strong>{" "}
              {note.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
