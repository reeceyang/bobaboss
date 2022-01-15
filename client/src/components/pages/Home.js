import React, { useEffect, useState } from "react";
import { get } from "../../utilities.js";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    get("/api/review", {}).then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <>
      <pre>
        {reviews.map((review) => {
          return JSON.stringify(review, null, 2);
        })}
      </pre>
    </>
  );
};

export default Home;
