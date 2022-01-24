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
    _id: null,
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

  useEffect(() => {
    if (props.review) {
      setReview({ ...props.review, date_visited: new Date(props.review.date_visited) });
    }
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [shopFocused, setShopFocused] = React.useState(false);
  const onShopFocus = () => setShopFocused(true);
  const onShopBlur = () => setShopFocused(false);

  const showSuggestions = (event) => {
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
  const [errors, setErrors] = useState([]);
  const handleClick = () => {
    if (photoInput.current && photoInput.current.files[0]) {
      const photo = photoInput.current.files[0];
      const formData = new FormData();
      formData.append("photo", photo);
      fetch("/api/upload/image", { method: "POST", body: formData })
        .then(convertToJSON)
        .then((res) => {
          post("/api/review", { ...review, photo_link: res.photoName })
            .then(() => {
              navigate(-1);
            })
            .catch((res) => {
              setErrors(JSON.parse(res.message).errors);
            });
        })
        .catch((res) => {
          setErrors([res.message]);
        });
    } else {
      post("/api/review", review)
        .then(() => {
          navigate(-1);
        })
        .catch((res) => {
          setErrors(JSON.parse(res.message).errors);
        });
    }
  };

  if (!props.userId) navigate("/join");

  return (
    <div className="boba-body">
      <h1>{props.review ? "Edit" : "New"} Review</h1>
      <div className="NewReview-container">
        <label>Flavor</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, drink_name: event.target.value });
          }}
          placeholder="example: Matcha Milk Tea"
          className="boba-textinput"
          value={review.drink_name}
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
            value={review.shop_name}
          />
          <SuggestionBox
            suggestions={suggestions}
            selected={review.shop_id}
            onChange={(shopId, shopName) => {
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
        {!review.photo_link ? (
          <input
            type="file"
            accept="image/*"
            name="photo"
            ref={photoInput}
            className="boba-textinput"
          />
        ) : (
          <input
            type="text"
            name="photo"
            value={review.photo_link}
            className="boba-textinput"
            disabled
          />
        )}
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
          value={review.size}
        />
        <label>Temperature</label>
        <RadioButton
          name="temperature"
          elements={["cold", "hot"]}
          checked={review.temperature}
          onClick={(event) => {
            setReview({ ...review, temperature: event.target.parentNode.firstChild.value });
          }}
          value={review.temperature}
        />
        <label>Ice</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, ice: event.target.value });
          }}
          placeholder="example: 50%"
          className="boba-textinput"
          value={review.ice}
        />
        <label>Sugar</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, sugar: event.target.value });
          }}
          placeholder="example: half"
          className="boba-textinput"
          value={review.sugar}
        />
        <label>Toppings</label>
        <input
          type="text"
          onChange={(event) => {
            setReview({ ...review, toppings: event.target.value });
          }}
          placeholder="example: tapioca, herbal jelly"
          className="boba-textinput"
          value={review.toppings}
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
            value={review.stars}
          />
        </div>
        <label>Review</label>
        <textarea
          onChange={(event) => {
            setReview({ ...review, review_text: event.target.value });
          }}
          placeholder="example: very yummy but slightly too sweet"
          className="boba-textarea"
          value={review.review_text}
        />
        <div></div>
        <div className="NewReview-errors">
          {errors.map((error) => (
            <p>error: {error}</p>
          ))}
        </div>
      </div>

      <button onClick={handleClick} className="boba-button NewReview-submit">
        Submit
      </button>
    </div>
  );
};

export default NewReview;
