import React from "react";
import "./Footer.css";
import { Link } from "@reach/router";

const Footer = () => {
  return (
    <div className="Footer-container">
      <div className="u-textCenter Footer-text">
        <div className="Footer-boba">
          <Link to="/" className="boba-link">
            BobaBoss
          </Link>
        </div>

        <div>
          &copy; {new Date().getFullYear()} made with {"<3"} by reece
        </div>
      </div>
      <div className="Footer-text">
        <Link to="/new/" className="boba-link">
          New&nbsp;Review
        </Link>
        <Link to="/explore/" className="boba-link">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Footer;
