import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Review from "../modules/Review";

const ReviewPage = (props) => {
  const [review, setReview] = useState(null);
  useEffect(() => {
    get(`/api/review`, { _id: props.reviewId }).then((reviews) => {
      if (reviews.length > 0) {
        setReview(reviews[0]);
      }
    });
  }, []);

  if (!review) {
    return <div className="boba-body"> Review not found! </div>;
  }
  return (
    <div className="boba-body">
      <Review review={review} />
    </div>
  );
};

export default ReviewPage;
