import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const search = async () => {
    if (username) {
      try {
        const response = await fetch(
          "https://api.github.com/users/" + username
        );
        const data = await response.json();
        if (data.message !== "Not Found") {
          setUserData(data);
        } else {
          setUserData(null);
          console.log("User not found..");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.log("Enter User Name");
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          placeholder="Search GitHub username..."
          onChange={handleInputChange}
        />
        <button type="button" onClick={search} className="search">
          Search
        </button>
      </header>
      {userData && (
        <div className="profileCard">
          <img src={userData.avatar_url} alt="avatar" />
          <div className="profileInfo">
            <div className="userdate">
              <h2>{userData.name || "Not Available"}</h2>
              <p>Joined {new Date(userData.created_at).toLocaleDateString()}</p>
            </div>
            <p>@{userData.login}</p>
            <p>{userData.bio || "This profile has no bio"}</p>
            <div className="stats">
              <div>
                Repos
                <br />
                {userData.public_repos}
              </div>
              <div>
                Followers
                <br />
                {userData.followers}
              </div>
              <div>
                Following
                <br />
                {userData.following}
              </div>
            </div>
            <div className="extrnalDetail">
              <p>{userData.location || "Location not available"}</p>
              <p>
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.organizations_url || "Organization not available"}
                </a>
              </p>
              <p>
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.twitter_username || "Twitter Username not available"}
                </a>
              </p>
              <p>
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.blog || "Blog not available"}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
