import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { FaBars } from "react-icons/fa";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "57411572588-7kqi3h9r5bndth2mqdutet9d856ste27.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const resizeWidth = 690;

  return (
    <nav className="NavBar-container">
      <Link to="/" className="NavBar-title NavBar-link u-inlineBlock">
        BobaBoss
      </Link>
      {screenWidth <= resizeWidth ? (
        <button className="boba-button NavBar-toggle" onClick={toggleNav}>
          <FaBars className="NavBar-bars" />
        </button>
      ) : (
        <></>
      )}

      {(toggleMenu || screenWidth > resizeWidth) && (
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
      )}
    </nav>
  );
};

export default NavBar;
