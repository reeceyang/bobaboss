import React from "react";
import { Rating } from "react-simple-star-rating";

const StatsBox = (props) => {
  const none = <span style={{ color: "var(--darkgrey)" }}>none</span>;
  const getAverageRating = () => {
    if (props.reviews.length === 0) return NaN;
    let sum = 0;
    props.reviews.map((review) => {
      sum += Number(review.stars);
    });
    return sum / props.reviews.length;
  };
  const getAveragePrice = () => {
    if (props.reviews.length === 0) return none;
    let sum = 0;
    props.reviews.map((review) => {
      sum += Number(review.price);
    });
    return `$${(sum / props.reviews.length).toFixed(2).toString()}`;
  };
  const getColdOrHot = () => {
    if (props.reviews.length === 0) return "0 cold drink reviews and 0 hot drink reviews";
    let cold = 0;
    props.reviews.map((review) => {
      if (review.temperature === "cold") {
        cold++;
      }
    });
    return `${cold} cold drink review${cold !== 1 ? "s" : ""} and ${
      props.reviews.length - cold
    } hot drink review${props.reviews.length - cold !== 1 ? "s" : ""}`;
  };
  return (
    <div className="boba-box">
      <div>
        <div className="Review-subTitle u-inlineBlock">Average Rating:&nbsp;&nbsp;</div>
        <div className="u-inlineBlock">
          <Rating
            ratingValue={getAverageRating()}
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
        </div>
      </div>
      <div>
        <div className="Review-subTitle u-inlineBlock">Average Price: {getAveragePrice()}</div>
      </div>
      <div>
        <div className="Review-subTitle u-inlineBlock">{getColdOrHot()}</div>
      </div>
    </div>
  );
};

export default StatsBox;
