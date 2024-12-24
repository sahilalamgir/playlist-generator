import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [mood, setMood] = useState("");
  const [song, setSong] = useState("");

  const handleSelectChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/submit", {mood});
      setSong(response.data.message);
    } catch(error) {
      console.error("Error sending data to Flask:", error);
      setSong("Failed to connect to the server.");
    };
  };

  return (
    <div>
      <h1>This is my dropdown menu!</h1>
      <select value={mood} onChange={handleSelectChange}>
        <option value="" disabled>Select a mood</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="romantic">Romantic</option>
        <option value="chill">Chill</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
      <p>{song}</p>
    </div>
  );
};
