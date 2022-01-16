import React, { useState, useEffect, useCallback } from "react";
import { get, post } from "../../utilities";
import { navigate } from "@reach/router";
import "./NewReview.css";
import SuggestionBox from "../modules/SuggestionBox";
import { DebounceInput } from "react-debounce-input";
import { Rating } from "react-simple-star-rating";

const NewReview = (props) => {
  const [shop, setShop] = useState("");
  const [review, setReview] = useState({
    drink_name: "",
    shop_id: "",
    date_visited: new Date(),
    photo_link: "",
    price: NaN,
    size_temperature: "",
    ice: "",
    sugar: "",
    toppings: "",
    stars: NaN,
    review_text: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [shopFocused, setShopFocused] = React.useState(false);
  const onShopFocus = () => setShopFocused(true);
  const onShopBlur = () => setShopFocused(false);

  const showSuggestions = () => {
    console.log(shop);
    get("/api/autocomplete/shop", { term: shop, location: "boston" }).then((res) => {
      setSuggestions(res.businesses);
    });
  };

  const handleClick = () => {
    post("/api/review", review);
    navigate("..");
  };

  if (!props.userId) return <div>Log in to post a review!</div>;

  return (
    <>
      <div className="NewReview-container">
        <label>Flavor</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, drink_name: event.target.value });
          }}
          placeholder="example: Matcha Milk Tea"
          className="boba-textinput"
        />

        <label>Shop</label>
        <div style={{ display: "grid" }}>
          <DebounceInput
            onChange={(event) => {
              setShop(event.target.value);
              showSuggestions();
            }}
            debounceTimeout={300}
            placeholder="example: "
            className="boba-textinput NewReview-shop"
            value={shop}
            onFocus={onShopFocus}
            onBlur={onShopBlur}
          />
          <SuggestionBox
            suggestions={suggestions}
            selected={review.shop_id}
            onChange={(shopId) => {
              console.log(shopId);
              setReview({ ...review, shop_id: shopId });
            }}
            shopFocused={shopFocused}
          />
        </div>

        <label>Date</label>
        <input
          type="date"
          onChange={(event) => {
            const adjustedDate = new Date(event.target.value);
            adjustedDate.setDate(adjustedDate.getDate() + 1);
            console.log(adjustedDate);
            setReview({ ...review, date_visited: adjustedDate });
          }}
          value={new Date(
            review.date_visited.getTime() - review.date_visited.getTimezoneOffset() * 60000
          )
            .toISOString()
            .substring(0, 10)}
          className="boba-textinput"
        />

        <label>Photo</label>
        <div></div>

        <label>Price</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, price: Number(event.target.value) });
          }}
          placeholder="example: $6.90"
          className="boba-textinput"
        />

        <label>Size and/or Temperature</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, size_temperature: event.target.value });
          }}
          placeholder="example: medium, hot"
          className="boba-textinput"
        />

        <label>Ice</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, ice: event.target.value });
          }}
          placeholder="example: 50%"
          className="boba-textinput"
        />

        <label>Sugar</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, sugar: event.target.value });
          }}
          placeholder="example: half"
          className="boba-textinput"
        />

        <label>Toppings</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, toppings: event.target.value });
          }}
          placeholder="example: tapioca, herbal jelly"
          className="boba-textinput"
        />

        <label>Stars</label>
        <div>
          <Rating
            onClick={(rating) => {
              setReview({ ...review, stars: rating });
            }}
            ratingValue={review.stars}
            fillColor="#fec5bb"
            allowHalfIcon={true}
            transition={true}
            showTooltip={true}
            tooltipStyle={{ backgroundColor: "#f7f7f7", color: "#000" }}
            tooltipDefaultText="your rating"
            tooltipArray={[
              "appalling",
              "horrible",
              "very bad",
              "bad",
              "average",
              "fine",
              "good",
              "very good",
              "great",
              "masterpiece",
            ]}
          />
        </div>

        <label>Review</label>
        <textarea
          onChange={(event) => {
            setReview({ ...review, review_text: event.target.value });
          }}
          placeholder="example: very yummy but slightly too sweet"
          className="boba-textarea"
        />
      </div>
      <button onClick={handleClick} className="boba-button NewReview-submit">
        Submit
      </button>
    </>
  );
};

export default NewReview;
