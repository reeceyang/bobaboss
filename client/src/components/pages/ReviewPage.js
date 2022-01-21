import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Review from "../modules/Review";
import NewReview from "./NewReview";

const ReviewPage = (props) => {
  const [review, setReview] = useState(null);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    get(`/api/review`, { _id: props.reviewId }).then((reviews) => {
      if (reviews.length > 0) {
        setReview(reviews[0]);
      }
    });
  }, []);

  const [userId, setUserId] = useState(undefined);
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const editReview = () => {
    setEditing(!editing);
  };

  if (!review) {
    return <div className="boba-body"> Review not found! </div>;
  }
  return (
    <div className="boba-body">
      <Review review={review} />
      {userId === review.author_id ? (
        <div>
          <button className="boba-button" onClick={editReview}>
            Edit
          </button>
          <button className="boba-button">Delete</button>
        </div>
      ) : (
        <></>
      )}
      {editing ? <NewReview review={review} userId={userId} /> : <></>}
    </div>
  );
};

export default ReviewPage;
