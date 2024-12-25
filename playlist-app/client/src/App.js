import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Card } from "react-bootstrap";

const CLIENT_ID = "95b30e78e5be4447b7502fa053575c29";
const CLIENT_SECRET = "ac4c081390764e8aa49e5b557da4621d";

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [mood, setMood] = useState("");
  const [song, setSong] = useState("");

  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
    }

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));
  }, []);

  const handleSelectChange = (e) => {
    setMood(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/submit", {mood});
      setSong(response.data.message);
      const searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
      const track = fetch("https://api.spotify.com/v1/tracks/" + response.data.message, searchParameters)
        .then(result => result.json())
        .then(data => console.log(data));
    } catch(error) {
      console.error("Error sending data to Flask:", error);
      setSong("Failed to connect to the server.");
    };
  };

  return (
    <div>
      <Container>
        <h1>This is my dropdown menu!</h1>
        <select value={mood} onChange={handleSelectChange}>
          <option value="" disabled>Select a mood</option>
          <option value="energetic">Energetic</option>
          <option value="sad">Sad</option>
          <option value="nostalgic">Nostalgic</option>
          <option value="romantic">Romantic</option>
          <option value="chill">Chill</option>
          <option value="intense">Intense</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        <p>{song}</p>
      </Container>
    </div>
  );
};
