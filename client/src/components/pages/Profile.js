import React, { useEffect, useState } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import Feed from "../modules/Feed";
import StatsBox from "../modules/StatsBox";
import RadioButton from "../modules/RadioButton";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    get(`/api/user`, { userId: props.userId }).then((user) => {
      setUser(user);
      document.title = user.name + " — BobaBoss";
      get("/api/review", { author_id: user._id }).then((reviews) => {
        setReviews(reviews);
      });
    });
    return () => {
      document.title = "BobaBoss";
    };
  }, []);

  const [filterMethod, setFilterMethod] = useState("none");
  const [sortMethod, setSortMethod] = useState("rating (▼)");
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

  if (!user) {
    return <div className="boba-body"> User not found! </div>;
  }
  return (
    <>
      <div className="boba-body">
        <h1>{user.name}</h1>
        <StatsBox reviews={reviews} />
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

        <h2>
          {refineSearch(reviews).length} Review{reviews.length !== 1 ? "s" : ""}
        </h2>

        <Feed reviews={refineSearch(reviews)} userId={props.userId} />
      </div>
    </>
  );
};

export default Profile;
