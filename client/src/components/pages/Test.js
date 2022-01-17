import React from "react";
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

const Test = () => {
  const testPostReview = () => {
    post("/api/review", TEST_REVIEW_BODY);
  };

  const testGetReview = () => {
    get("/api/review", {}).then((reviews) => {
      console.log(reviews);
    });
  };

  const testAutocompleteShop = () => {
    get("/api/autocomplete/shop", { term: "gongcha", location: "boston" }).then((reviews) => {
      console.log(reviews);
    });
  };
  return (
    <>
      <button onClick={testPostReview}>test post review</button>
      <button onClick={testGetReview}>test get review</button>
      <button onClick={testAutocompleteShop}>test autocompleteshop</button>
    </>
  );
};

export default Text;
