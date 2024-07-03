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
          console.log("User not found.");
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
      <h1 className="head">Dev Finder</h1>
      <header className="App-header">
        <img
          src="https://purepng.com/public/uploads/large/search-icon-lob.png"
          alt="Search Icon"
          className="searchIcon"
        />
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
              <div className="extrnalLink1">
                <p>
                  <img
                    src="https://logodix.com/logo/37864.png"
                    alt="location logo"
                    className="externalLogo"
                  />
                  {userData.location || "Location not available"}
                </p>
                <p>
                  <img
                    src="https://images.vexels.com/media/users/3/145057/isolated/preview/40162fe877a9228c5cd5f28939af5a0e-office-building-silhouette-by-vexels.png"
                    alt="organization logo"
                    className="externalLogo"
                  />
                  <a
                    href={userData.organizations_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.organizations_url
                      ? "View Organizations"
                      : "Organization not available"}
                  </a>
                </p>
              </div>
              <div className="extrnalLink1">
                <p>
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/Twitter-Logo.png"
                    alt="twitterlogo"
                    className="externalLogo"
                  />
                  <a
                    href={`https://twitter.com/${userData.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.twitter_username ||
                      "Twitter Username not available"}
                  </a>
                </p>
                <p>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/016/017/028/original/transparent-link-icon-free-png.png"
                    alt="bloglogo"
                    className="externalLogo"
                  />
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
        </div>
      )}
    </div>
  );
}

export default App;
