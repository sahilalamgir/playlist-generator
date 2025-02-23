import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, FormControl, InputGroup, Button, Row, Card } from "react-bootstrap";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public`;

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

    console.log("Tokennn:", accessToken)
    if (code) {
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000",
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

          const userParameters = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.access_token}`
            },
          };
          fetch("https://api.spotify.com/v1/me", userParameters)
            .then(result => result.json())
            .then(data => {
              console.log(data);
              setUserID(data.id);
            })
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
    console.log("my acctok", accessToken);
    console.log(playlist)
    if (playlist.length !== 0) {
      const createPlaylistParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription
        })
      };
      console.log(createPlaylistParameters);
      console.log("IDDDDD:", userID);
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, createPlaylistParameters)
        .then(result => result.json())
        .then(data => {
          console.log(data)
          setPlaylistID(data.id)
  
          const addTracksParameters = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              "uris": playlist.map(track => `spotify:track:${track}`)
            })
          };
          fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, addTracksParameters)
            .then(result => result.json())
            .then(data => {
              console.log(data)
            })
        }
      );
    }
  };

  return (
    <div className="App">
      {(!accessToken) ? (
        <Button className="btn-success" onClick={handleLogin}>Login with Spotify</Button>
      ) : (
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
      )}
    </div>
  );
};