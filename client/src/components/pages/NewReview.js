import React, { useState } from "react";
import { post } from "../../utilities";
import { navigate } from "@reach/router";
import "./NewReview.css";

const NewReview = (props) => {
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

  const handleClick = () => {
    post("/api/review", review);
    navigate("..");
  };

  if (!props.userId) return <div>Log in to post a review!</div>;

  return (
    <>
      <div className="NewReview-container">
        <div className="NewReview-row">
          <label>Flavor</label>
          <input
            type="text"
            onChange={(event) => {
              setReview({ ...review, drink_name: event.target.value });
            }}
            placeholder="example: Matcha Milk Tea"
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
          <label>Shop</label>
          <input
            type="text"
            onChange={(event) => {
              // setReview({ ...review, drink_name: event.target.value });
            }}
            placeholder="example: "
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
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
        </div>
        <div className="NewReview-row">
          <label>Photo</label>
        </div>
        <div className="NewReview-row">
          <label>Price</label>
          <input
            type="text"
            onChange={(event) => {
              setReview({ ...review, price: Number(event.target.value) });
            }}
            placeholder="example: $6.90"
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
          <label>Size and/or Temperature</label>
          <input
            type="text"
            onChange={(event) => {
              setReview({ ...review, size_temperature: event.target.value });
            }}
            placeholder="example: medium, hot"
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
          <label>Ice</label>
          <input
            type="text"
            onChange={(event) => {
              setReview({ ...review, ice: event.target.value });
            }}
            placeholder="example: 50%"
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
          <label>Sugar</label>
          <input
            type="text"
            onChange={(event) => {
              setReview({ ...review, sugar: event.target.value });
            }}
            placeholder="example: half"
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
          <label>Toppings</label>
          <input
            type="text"
            onChange={(event) => {
              setReview({ ...review, toppings: event.target.value });
            }}
            placeholder="example: tapioca, herbal jelly"
            className="boba-textinput"
          />
        </div>
        <div className="NewReview-row">
          <label>Stars</label>
        </div>
        <div className="NewReview-row">
          <label>Review</label>
          <textarea
            onChange={(event) => {
              setReview({ ...review, review_text: event.target.value });
            }}
            placeholder="example: very yummy but slightly too sweet"
            className="boba-textarea"
          />
        </div>
      </div>
      <button onClick={handleClick} className="boba-button NewReview-submit">
        Submit
      </button>
    </>
  );
};

export default NewReview;
