import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, FormControl, InputGroup, Button, Row, Card } from "react-bootstrap";

const CLIENT_ID = "95b30e78e5be4447b7502fa053575c29";
const CLIENT_SECRET = "ac4c081390764e8aa49e5b557da4621d";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/callback&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public`;

export default function App() {
  const [accessToken, setAccessToken] = useState("");
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [userID, setUserID] = useState("");
  const [playlistID, setPlaylistID] = useState("");

  const handleLogin = () => {
    window.location.href = AUTH_URL;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorize",
          code: code,
          redirect_uri: "http://localhost:3000/callback",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        }).toString()
      }

      console.log("Authorization code:", code);
      console.log("Authorization URL:", AUTH_URL);
      console.log("Fetch parameters:", authParameters);
  
      fetch("https://accounts.spotify.com/api/token", authParameters)
        .then(result => result.json())
        .then(data => {
          console.log(data);
          setAccessToken(data.access_token);
          // window.history.replaceState({}, document.title, "/");
        })
        .catch(err => console.log("Token exchange error:", err));
    }
  }, []);

  const handleSelectChange = (e) => {
    setMood(e.target.value);
  };

  const generatePlaylist = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/submit", {mood});
      console.log(response.data.message);
      setPlaylist(response.data.message);
      setError(false);
    } catch(error) {
      console.error("Error sending data to Flask:", error);
      setError(true);
    };
  };

  const createPlaylist = async () => {
    const createParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: {
        "name": playlistName,
        "description": playlistDescription
      }
    };
    console.log(createParameters);
    // fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, createParameters)
    //   .then(result => result.json())
    //   .then(data => {
    //     console.log(data)
    //   }
    // );
  };

  return (
    <div className="App">
      {}
      <div>
      <Container className="my-4 text-center">
        <h1>Playlist Generator</h1>
        <select value={mood} onChange={handleSelectChange}>
          <option value="" disabled>Select a mood</option>
          <option value="energetic">Energetic</option>
          <option value="sad">Sad</option>
          <option value="nostalgic">Nostalgic</option>
          <option value="romantic">Romantic</option>
          <option value="chill">Chill</option>
          <option value="intense">Intense</option>
        </select>
        <Button onClick={generatePlaylist}>Generate Playlist</Button>
      </Container>

      <div style={{display: "flex", flexDirection: "row"}}>
        <Container style={{flex: 4}}>
          {error ? (
            <p>Couldn't connect to Flask server.</p>
          ) : (
            <Row className="my-5 row row-cols-4">
              {playlist.map((track, i) => {
                console.log(track);
                return (
                    <iframe
                      className="my-1"
                      src={`https://open.spotify.com/embed/track/${track}`}
                      width="250"
                      height="352"
                      frameBorder="0"
                      allow="encrypted-media"
                    ></iframe>                   
                )})}
            </Row>
          )}
        </Container>

        <Container className="my-5" style={{flex: 1}}>
          <h2>Playlist Name</h2>
          <InputGroup className="my-4">
            <FormControl
              placeholder="Enter playlist name"
              type="input"
              value={playlistName}
              onChange={event => setPlaylistName(event.target.value)}
            />
          </InputGroup>

          <h2>Playlist Description</h2>
          <InputGroup className="my-4">
            <FormControl
              placeholder="Enter playlist description"
              type="input"
              value={playlistDescription}
              onChange={event => setPlaylistDescription(event.target.value)}
            />
          </InputGroup>
          
          <Button onClick={createPlaylist}>
            Create Playlist
          </Button>
        </Container>
      </div>
      </div>
    </div>
  );
};
