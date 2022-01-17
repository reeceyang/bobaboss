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
