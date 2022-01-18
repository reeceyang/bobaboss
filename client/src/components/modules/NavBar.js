import React, { useEffect, useRef } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "57411572588-7kqi3h9r5bndth2mqdutet9d856ste27.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <Link to="/" className="NavBar-title NavBar-link u-inlineBlock">
        BobaBoss
      </Link>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/new/" className="NavBar-link boba-button">
          New Review
        </Link>
        <Link to="/explore/" className="NavBar-link boba-button">
          Explore
        </Link>
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link boba-button">
            My Profile
          </Link>
        )}
        {props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login GoogleLogin"
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login GoogleLogin"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
