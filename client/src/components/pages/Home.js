import React, { useEffect, useState } from "react";
import Feed from "../modules/Feed.js";
import { get, formatParams } from "../../utilities.js";
import LazyHero from "react-lazy-hero";

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
      {!props.userId ? (
        <LazyHero
          imageSrc="./frank-zhang-uJjeWXc7lMM-unsplash.jpg"
          minHeight="75vh"
          color="#000"
          opacity="0.5"
          parallaxOffset="300"
        >
          <h1 style={{ color: "var(--grey)", margin: "var(--xs)" }}>
            Find the best <span style={{ color: "var(--primary)" }}>boba</span> in Boston
          </h1>
        </LazyHero>
      ) : (
        <></>
      )}

      <div className="boba-body">
        {!props.userId ? (
          <></>
        ) : (
          <>
            <h1>
              Welcome back{props.userName ? "," : ""} {props.userName}
            </h1>
          </>
        )}
        <h3>Discover your next flavor</h3>
        <SearchInput onSearch={goExplore} />
        <h1>Trending</h1>
        <Feed reviews={reviews.reverse()} />
      </div>
    </>
  );
};

export default Home;
