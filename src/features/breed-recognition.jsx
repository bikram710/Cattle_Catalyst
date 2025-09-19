import React, { useState } from "react";

function BreedRecognition() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use your backend API base URL from React environment variables (.env)
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPredictions(null);
      setError("");
    }
  };

  // Upload image to your backend and get public URL
  const uploadToBackendAndGetUrl = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${BACKEND_URL}/api/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Image upload failed.");
    }

    const data = await response.json();
    return data.imageUrl;
  };

  // Call backend API to get breed prediction
  const callBackendForPrediction = async (imgUrl) => {
    const response = await fetch(`${BACKEND_URL}/api/predict-breed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: imgUrl }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Prediction request failed");
    }

    return response.json();
  };

  // Main handler: upload image, call backend API, display results
  const handleRecognizeBreed = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setPredictions(null);

    try {
      const uploadedImageUrl = await uploadToBackendAndGetUrl(image);
      setImageUrl(uploadedImageUrl);

      const prediction = await callBackendForPrediction(uploadedImageUrl);

      setPredictions(prediction);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Breed Recognition</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <div style={{ marginTop: 20 }}>
          <img
            src={URL.createObjectURL(image)}
            alt="Pet preview"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}

      <button
        onClick={handleRecognizeBreed}
        disabled={loading}
        style={{ marginTop: 20, padding: "10px 20px" }}
      >
        {loading ? "Recognizing..." : "Recognize Breed"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 20, whiteSpace: "pre-wrap" }}>
          {error}
        </p>
      )}

      {predictions && (
        <div style={{ marginTop: 20 }}>
          <h3>Predicted Breed</h3>
          <p>
            <strong>Breed:</strong> {predictions.label || "Unknown"}
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            {predictions.confidence
              ? (predictions.confidence * 100).toFixed(2) + "%"
              : "N/A"}
          </p>
        </div>
      )}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <h4>Uploaded Image URL</h4>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default BreedRecognition;
