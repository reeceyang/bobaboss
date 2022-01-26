import React, { useEffect, useState } from "react";
import Feed from "../modules/Feed.js";
import SearchInput from "../modules/SearchInput.js";
import RadioButton from "../modules/RadioButton.js";
import { get } from "../../utilities.js";

import "./Search.css";

const Explore = (props) => {
  const [reviews, setReviews] = useState([]);
  const [filterMethod, setFilterMethod] = useState("none");
  const [sortMethod, setSortMethod] = useState("rating (▼)");

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

  const refineSearch = (arr) => {
    let newArr = arr;
    if (filterMethod !== "none") {
      newArr = arr.filter((review) => review.temperature === filterMethod);
    }
    if (sortMethod === "date (▲)") {
      newArr.sort((a, b) => {
        const date1 = new Date(a.date_visited).getTime();
        const date2 = new Date(b.date_visited).getTime();
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
      });
    } else if (sortMethod === "date (▼)") {
      newArr.sort((a, b) => {
        const date1 = new Date(a.date_visited).getTime();
        const date2 = new Date(b.date_visited).getTime();
        return -1 * (date1 > date2 ? 1 : date1 < date2 ? -1 : 0);
      });
    } else if (sortMethod === "rating (▲)") {
      newArr.sort((a, b) => (a.stars > b.stars ? 1 : a.stars < b.stars ? -1 : 0));
    } else if (sortMethod === "rating (▼)") {
      newArr.sort((a, b) => -1 * (a.stars > b.stars ? 1 : a.stars < b.stars ? -1 : 0));
    } else if (sortMethod === "price (▲)") {
      newArr.sort((a, b) => (a.price > b.price ? 1 : a.price < b.price ? -1 : 0));
    } else if (sortMethod === "price (▼)") {
      newArr.sort((a, b) => -1 * (a.price > b.price ? 1 : a.price < b.price ? -1 : 0));
    }

    return newArr;
  };

  useEffect(() => {
    if (props.location.search) {
      const query = Object.fromEntries(new URLSearchParams(props.location.search));
      if (query.searchMethod) getReviews(query.input, query.searchMethod);
    }
  }, []);

  return (
    <div className="boba-body">
      <h1>Find the best boba in Boston</h1>
      <SearchInput onSearch={getReviews} />
      <h2>Filter</h2>
      <RadioButton
        name="filter"
        elements={["none", "hot", "cold"]}
        checked={filterMethod}
        onClick={(event) => {
          setFilterMethod(event.target.parentNode.firstChild.value);
        }}
      />
      <h2>Sort</h2>
      <RadioButton
        name="sort"
        elements={["date (▲)", "date (▼)", "price (▲)", "price (▼)", "rating (▲)", "rating (▼)"]}
        checked={sortMethod}
        onClick={(event) => {
          setSortMethod(event.target.parentNode.firstChild.value);
        }}
      />
      {reviews.length > 0 ? (
        <>
          <h1>Results</h1>

          <Feed reviews={refineSearch(reviews)} userId={props.userId} />
        </>
      ) : (
        <>
          <h1>No Results Yet</h1>
          <h2>Try another search?</h2>
        </>
      )}
    </div>
  );
};

export default Explore;
