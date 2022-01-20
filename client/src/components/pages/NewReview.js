import React, { useState, useRef, useEffect } from "react";
import { get, post, convertToJSON } from "../../utilities";
import { navigate } from "@reach/router";
import "./NewReview.css";
import SuggestionBox from "../modules/SuggestionBox";
import RadioButton from "../modules/RadioButton";
import { DebounceInput } from "react-debounce-input";
import { Rating } from "react-simple-star-rating";

const NewReview = (props) => {
  const [review, setReview] = useState({
    drink_name: "",
    shop_id: "",
    shop_name: "",
    date_visited: new Date(),
    photo_link: null,
    price: NaN,
    size: "",
    temperature: "cold",
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

  const showSuggestions = (event) => {
    console.log(event.target.value);
    get("/api/autocomplete/shop", { term: event.target.value, location: "boston" }).then((res) => {
      let possibleSelected = [];
      if (review.shop_id !== "") {
        possibleSelected = suggestions.filter((suggestion) => {
          return suggestion.id === review.shop_id;
        });
      }
      setSuggestions(possibleSelected.concat(res.businesses));
    });
  };

  const photoInput = useRef(null);
  const handleClick = () => {
    if (photoInput.current.files[0]) {
      const photo = photoInput.current.files[0];
      const formData = new FormData();
      formData.append("photo", photo);
      fetch("/api/upload/image", { method: "POST", body: formData })
        .then(convertToJSON)
        .then((res) => {
          post("/api/review", { ...review, photo_link: res.photoName }).then(() => {
            navigate("..");
          });
        });
    } else {
      post("/api/review", review).then(() => {
        navigate("..");
      });
    }
  };

  if (!props.userId) return <div>Log in to post a review!</div>;

  return (
    <div className="boba-body">
      <h1>New Review</h1>

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
              showSuggestions(event);
            }}
            debounceTimeout={500}
            placeholder="example: reece’s tea at 3 ames st, cambridge"
            className="boba-textinput NewReview-shop"
            onFocus={onShopFocus}
            onBlur={onShopBlur}
          />
          <SuggestionBox
            suggestions={suggestions}
            selected={review.shop_id}
            onChange={(shopId, shopName) => {
              console.log(shopId);
              setReview({ ...review, shop_id: shopId, shop_name: shopName });
            }}
            shopFocused={shopFocused}
          />
        </div>

        <label>Date Visited</label>
        <input
          type="date"
          onChange={(event) => {
            const adjustedDate = new Date(event.target.value);
            if (!isNaN(adjustedDate.getTime())) {
              adjustedDate.setDate(adjustedDate.getDate() + 1);
              setReview({ ...review, date_visited: adjustedDate });
            }
          }}
          value={new Date(
            review.date_visited.getTime() - review.date_visited.getTimezoneOffset() * 60000
          )
            .toISOString()
            .substring(0, 10)}
          className="boba-textinput"
          required
        />

        <label>Photo</label>
        <input type="file" name="photo" ref={photoInput} className="boba-textinput" />

        <label>Price ($)</label>
        <input
          type="number"
          onChange={(event) => {
            setReview({ ...review, price: Number(event.target.value) });
          }}
          placeholder="example: 6.90"
          step="0.01"
          className="boba-textinput"
          value={Number(review.price)}
        />

        <label>Size</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, size: event.target.value });
          }}
          placeholder="example: medium"
          className="boba-textinput"
        />

        <label>Temperature</label>
        <RadioButton
          name="temperature"
          elements={["cold", "hot"]}
          checked={review.temperature}
          onClick={(event) => {
            setReview({ ...review, temperature: event.target.parentNode.firstChild.value });
          }}
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
            tooltipStyle={{ backgroundColor: "var(--grey)", color: "#000" }}
            tooltipDefaultText="select your rating"
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
    </div>
  );
};

export default NewReview;
