import React, { useEffect, useState } from "react";
import Feed from "../modules/Feed.js";
import { get, formatParams } from "../../utilities.js";

import "./Home.css";
import SearchInput from "../modules/SearchInput.js";
import { navigate } from "@reach/router";

const Home = (props) => {
  const [reviews, setReviews] = useState([]);
  const goExplore = (input, searchMethod) => {
    navigate(
      "/explore" +
        "?" +
        formatParams({
          input: input,
          searchMethod: searchMethod,
        })
    );
  };

  useEffect(() => {
    document.title = "BobaBoss";
    get("/api/review", {}).then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <>
      <div className="boba-body">
        {!props.userId ? (
          <h1>Find the best boba in Boston</h1>
        ) : (
          <>
            <h1>Welcome back, {props.userName}</h1>
            <h3>Find your next flavor</h3>
          </>
        )}
        <SearchInput onSearch={goExplore} />
        <h1>Trending</h1>
        <Feed reviews={reviews.reverse()} />
      </div>
    </>
  );
};

export default Home;
