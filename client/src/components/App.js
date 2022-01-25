import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
// import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import NewReview from "./pages/NewReview.js";
import Home from "./pages/Home.js";
import Explore from "./pages/Explore.js";
import Profile from "./pages/Profile.js";
import Footer from "./modules/Footer.js";
import ShopPage from "./pages/ShopPage.js";
import Attributions from "./pages/Attributions.js";
import Contact from "./pages/Contact.js";

import "../utilities.css";
import "../boba-ui.css";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import ReviewPage from "./pages/ReviewPage.js";
import JoinPage from "./pages/JoinPage.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  // uncomment for random primary colors
  // const primaryColors = ["#FEC5BB", "#B4C8BC", "#FEC89A"];
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
      }
    });
    // document.documentElement.style.setProperty(
    //   "--primary",
    //   primaryColors[Math.floor(Math.random() * primaryColors.length)]
    // );
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(user.name);
      // post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <div style={{ flexGrow: 1 }}>
        <Router>
          {/* <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
          <Home path="/" userId={userId} userName={userName} />
          <Profile path="/profile/:userId" userId={userId} />
          <ReviewPage path="/review/:reviewId" />
          <NewReview path="/new" userId={userId} />
          <Explore path="/explore" />
          <JoinPage path="/join" setters={{ setUserName, setUserId }} />
          <ShopPage path="/shop/:shopId" />
          <Attributions path="/attributions" />
          <Contact path="/contact" />
          <NotFound default />
        </Router>
      </div>
      <Footer userId={userId} />
    </>
  );
};

export default App;
