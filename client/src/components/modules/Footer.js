import React from "react";
import "./Footer.css";
import { Link } from "@reach/router";

const Footer = (props) => {
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
        {!props.userId ? (
          <div>
            <Link to="/join/" className="boba-link">
              Join
            </Link>
          </div>
        ) : (
          <></>
        )}

        <div>
          <Link to="/new/" className="boba-link">
            New&nbsp;Review
          </Link>
        </div>
        <div>
          <Link to="/explore/" className="boba-link">
            Explore
          </Link>
        </div>
        <div>
          <Link to="/attributions/" className="boba-link">
            Attributions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
