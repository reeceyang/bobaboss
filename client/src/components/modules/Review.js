import React from "react";
import { formatRelative } from "date-fns";
import { Rating } from "react-simple-star-rating";
import { Link } from "@reach/router";
import "./Review.css";

const Review = (props) => {
  return (
    <>
      <div className="boba-box">
        <div>
          <span className="Review-subTitle">
            <Link to={"/review/" + props.review._id} className="boba-link">
              {props.review.drink_name}
            </Link>
          </span>{" "}
          from <span className="Review-subTitle">{props.review.shop_name}</span>
        </div>
        <div>
          <span>
            <Link to={"/profile/" + props.review.author_id} className="boba-link">
              {props.review.author_name}
            </Link>
          </span>
          , <span>{formatRelative(new Date(props.review.date_visited), new Date())}</span>
        </div>
        {props.review.photo_link ? (
          <img
            className="Review-photo"
            src={`https://storage.googleapis.com/boba-photos/${props.review.photo_link}`}
          />
        ) : (
          <></>
        )}
        <div className="u-flex">
          <div className="Review-subContainer u-textCenter">
            <span className="Review-subTitle">Price</span>
            <div>${Number(props.review.price).toFixed(2)}</div>
          </div>
          <div className="Review-subContainer u-textCenter">
            <span className="Review-subTitle">Size</span>
            <div>{props.review.size}</div>
          </div>
          <div className="Review-subContainer u-textCenter">
            <span className="Review-subTitle">Temperature</span>
            <div>{props.review.temperature}</div>
          </div>
        </div>
        <hr style={{ border: "1pt solid var(--medgrey)" }} />
        <div className="u-flex">
          <div className="Review-subContainer u-textCenter">
            <span className="Review-subTitle">Ice</span>
            <div>{props.review.ice}</div>
          </div>
          <div className="Review-subContainer u-textCenter">
            <span className="Review-subTitle">Sugar</span>
            <div>{props.review.sugar}</div>
          </div>
          <div className="Review-subContainer u-textCenter">
            <span className="Review-subTitle">Toppings</span>
            <div>{props.review.toppings}</div>
          </div>
        </div>
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
          <div>{props.review.review_text}</div>
        </div>
      </div>
    </>
  );
};

export default Review;
