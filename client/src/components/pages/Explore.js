import React, { useEffect, useState } from "react";
import Feed from "../modules/Feed.js";
import SearchInput from "../modules/SearchInput.js";
import { get } from "../../utilities.js";

import "./Search.css";

const Explore = () => {
  const [reviews, setReviews] = useState([]);

  const getReviews = (input, searchMethod) => {
    if (searchMethod === "shop") {
      get("/api/review", { shop_id: input }).then((res) => setReviews(res));
    } else if (searchMethod === "flavor") {
      const tokens = input.split(" ");
      let regexString = "";
      for (const t in tokens) {
        if (tokens[t].toUpperCase() !== "MILK" && tokens[t].toUpperCase() !== "TEA") {
          regexString += tokens[t] + "|";
        }
      }
      get("/api/review/regex", {
        field: "drink_name",
        regex: regexString.slice(0, -1),
        options: "i",
      }).then((res) => setReviews(res));
    } else if (searchMethod === "franchise") {
      get("/api/review/regex", {
        field: "shop_name",
        regex: input,
        options: "i",
      }).then((res) => setReviews(res));
    } else if (searchMethod === "hot") {
      get("/api/review", { temperature: "hot" }).then((res) => setReviews(res));
    } else if (searchMethod === "cold") {
      get("/api/review", { temperature: "cold" }).then((res) => setReviews(res));
    } else if (searchMethod === "author") {
      get("/api/review/regex", {
        field: "author_name",
        regex: input,
        options: "i",
      }).then((res) => setReviews(res));
    } else if (searchMethod === "all") {
      get("/api/review", {}).then((res) => setReviews(res));
    }
  };

  return (
    <div className="boba-body">
      <h1>Find the best boba in Boston</h1>
      <SearchInput onSearch={getReviews} />
      <h1>Results</h1>
      <Feed reviews={reviews} />
    </div>
  );
};

export default Explore;
