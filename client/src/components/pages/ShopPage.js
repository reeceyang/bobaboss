import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import Feed from "../modules/Feed";

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
      <Feed reviews={reviews} />
    </div>
  );
};

export default ShopPage;
