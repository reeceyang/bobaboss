import React from "react";

const Attributions = () => {
  return (
    <div className="boba-body">
      <h1>Attributions</h1>
      <p>
        Photo by{" "}
        <a
          className="boba-link"
          href="https://unsplash.com/@rosalindjchang?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Rosalind Chang
        </a>{" "}
        on{" "}
        <a
          className="boba-link"
          href="https://unsplash.com/s/photos/boba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Unsplash
        </a>
      </p>
      <p>
        Photo by{" "}
        <a
          className="boba-link"
          href="https://unsplash.com/@terasproductions?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Frank Zhang
        </a>{" "}
        on{" "}
        <a
          className="boba-link"
          href="https://unsplash.com/s/photos/boba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Unsplash
        </a>
      </p>
    </div>
  );
};

export default Attributions;
