import React from "react";
import Review from "./Review.js";

const Feed = (props) => {
  return (
    <>
      {props.reviews.map((review) => {
        return <Review review={review} userId={props.userId} />;
      })}
    </>
  );
};

export default Feed;
