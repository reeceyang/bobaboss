import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
// import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import NewReview from "./pages/NewReview.js";
import Home from "./pages/Home.js";

import "../utilities.css";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

const TEST_REVIEW_BODY = {
  drink_name: "Wintermelon Milk Tea",
  shop_id: "shop_id",
  date_visited: new Date(),
  photo_link: "photo_link",
  price: "$6.90",
  size_temperature: "M",
  ice: "50%",
  sugar: "50%",
  toppings: "tapioca, herbal jelly",
  stars: 4.5,
  review_text: "vv yummy",
};

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const testPostReview = () => {
    post("/api/review", TEST_REVIEW_BODY);
  };

  const testGetReview = () => {
    get("/api/review", {}).then((reviews) => {
      console.log(reviews);
    });
  };

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
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
      <button onClick={testPostReview}>test post review</button>
      <button onClick={testGetReview}>test get review</button>
      <Router>
        {/* <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
        <Home path="/" />
        <NewReview path="/new" userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
