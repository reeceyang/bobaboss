import React, { useEffect, useState } from "react";
import Feed from "../modules/Feed.js";
import { get } from "../../utilities.js";

import "./Home.css";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    get("/api/review", {}).then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <>
      <div className="boba-body">
        <h1>Trending</h1>
        <Feed reviews={reviews.reverse()} />
      </div>
    </>
  );
};

export default Home;
