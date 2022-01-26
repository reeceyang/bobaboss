import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Feed from "../modules/Feed";
import StatsBox from "../modules/StatsBox";

const ShopPage = (props) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    get(`/api/review`, { shop_id: props.shopId }).then((res) => {
      if (res.length > 0) {
        setReviews(res);
      }
    });
  }, []);

  if (!reviews) {
    return <div className="boba-body"> Shop not found! </div>;
  }
  return (
    <div className="boba-body">
      <h1>{reviews[0].shop_name}</h1>
      <StatsBox reviews={reviews} />
      <h2>{reviews.length} Reviews</h2>
      <Feed reviews={reviews} userId={props.userId} />
    </div>
  );
};

export default ShopPage;
