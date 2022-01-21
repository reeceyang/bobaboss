import React, { useEffect, useState } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import Feed from "../modules/Feed";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    get(`/api/user`, { userId: props.userId }).then((user) => {
      setUser(user);
      document.title = user.name + " — BobaBoss";
      get("/api/review", { author_id: user._id }).then((reviews) => {
        setReviews(reviews);
      });
    });
    return () => {
      document.title = "BobaBoss";
    };
  }, []);

  if (!user) {
    return <div className="boba-body"> User not found! </div>;
  }
  return (
    <>
      <div className="boba-body">
        <h1>{user.name}</h1>
        <h2>{reviews.length} Reviews</h2>
        <Feed reviews={reviews.reverse()} />
      </div>
    </>
  );
};

export default Profile;
