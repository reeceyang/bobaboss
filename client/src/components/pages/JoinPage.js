import React from "react";
import Join from "../modules/Join";
import LazyHero from "react-lazy-hero/lib/LazyHero";

const JoinPage = (props) => {
  return (
    <>
      <LazyHero
        imageSrc="/rosalind-chang-P_wPicZYoPI-unsplash.jpg"
        minHeight="75vh"
        color="#000"
        opacity="0.5"
        parallaxOffset="300"
      >
        <h1 style={{ color: "var(--grey)", margin: "var(--xs)" }}>
          Be a <span style={{ color: "var(--primary)" }}>BobaBoss.</span>
        </h1>
      </LazyHero>
      <div className="boba-body">
        <Join handleLogin={props.handleLogin} setters={props.setters} />
      </div>
    </>
  );
};

export default JoinPage;
