import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { get, post, formatParams } from "../../utilities";
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

  const deleteReview = () => {
    if (window.confirm("Delete this review? This action is irreversible.")) {
      post("/api/review/delete", { _id: review._id })
        .then(() => {
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
          navigate(-1);
        });
    }
  };

  if (!review) {
    return <div className="boba-body"> Review not found! </div>;
  }
  return (
    <div className="boba-body">
      <Review review={review} userId={userId} />

      {userId === review.author_id ? (
        <div>
          <button className="boba-button" onClick={editReview}>
            Edit
          </button>
          <button className="boba-button" onClick={deleteReview}>
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
      {editing ? (
        <>
          <NewReview review={review} userId={userId} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="boba-button"
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <button
              className="boba-button"
              onClick={() => {
                navigate(
                  "/explore" +
                    "?" +
                    formatParams({
                      input: review.drink_name,
                      searchMethod: "flavor",
                    })
                );
              }}
            >
              Explore more “{review.drink_name}” reviews
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewPage;
