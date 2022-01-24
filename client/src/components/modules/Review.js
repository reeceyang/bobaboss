import React from "react";
import { formatRelative } from "date-fns";
import { Rating } from "react-simple-star-rating";
import { Link } from "@reach/router";
import "./Review.css";

const Review = (props) => {
  const none = <span style={{ color: "var(--darkgrey)" }}>none</span>;

  const dataGrid = (
    <div className="Review-datagrid">
      <span className="Review-subTitle">Price</span>
      <span>${Number(props.review.price).toFixed(2)}</span>

      <span className="Review-subTitle">Size</span>
      <span>{props.review.size ? props.review.size : none}</span>

      <span className="Review-subTitle">Temperature</span>
      <span>{props.review.temperature ? props.review.temperature : none}</span>

      <span className="Review-subTitle">Ice</span>
      <span>{props.review.ice ? props.review.ice : none}</span>

      <span className="Review-subTitle">Sugar</span>
      <span>{props.review.sugar ? props.review.sugar : none}</span>

      <span className="Review-subTitle">Toppings</span>
      <span>{props.review.toppings ? props.review.toppings : none}</span>
    </div>
  );

  return (
    <div className="boba-box">
      <div className="Review-inside">
        <div>
          <div className="Review-subTitle">
            <Link to={"/review/" + props.review._id} className="boba-link">
              {props.review.drink_name}
            </Link>
          </div>
          <div>
            from{" "}
            <Link to={"/shop/" + props.review.shop_id} className="boba-link">
              <span>{props.review.shop_name}</span>
            </Link>
          </div>
          <div>
            <span>
              <Link to={"/profile/" + props.review.author_id} className="boba-link">
                {props.review.author_name}
              </Link>
            </span>
            , <span>{formatRelative(new Date(props.review.date_visited), new Date())}</span>
          </div>
        </div>
        <div className="Review-main">
          <div className="Review-left">
            {props.review.photo_link ? (
              <img
                className="Review-photo"
                src={`https://storage.googleapis.com/boba-photos/${props.review.photo_link}`}
              />
            ) : (
              dataGrid
            )}
          </div>
          <div className="Review-right">
            {props.review.photo_link ? dataGrid : <></>}
            <div className="Review-bottom">
              <Rating
                ratingValue={props.review.stars}
                fillColor="var(--primary)"
                allowHalfIcon={true}
                showTooltip={true}
                tooltipStyle={{ backgroundColor: "var(--medgrey)", color: "#000" }}
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
                readonly
              />

              <div>
                <span className="Review-subTitle">Review</span>
                <div>{props.review.review_text ? props.review.review_text : none}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
