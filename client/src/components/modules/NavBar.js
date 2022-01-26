import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { FaBars } from "react-icons/fa";
import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "57411572588-7kqi3h9r5bndth2mqdutet9d856ste27.apps.googleusercontent.com";

const googleIcon = (
  <svg className="NavBar-google" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <g fill="#000" fill-rule="evenodd">
      <path
        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
        fill="#EA4335"
      ></path>
      <path
        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
        fill="#4285F4"
      ></path>
      <path
        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
        fill="#FBBC05"
      ></path>
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
        fill="#34A853"
      ></path>
      <path fill="none" d="M0 0h18v18H0z"></path>
    </g>
  </svg>
);

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
              render={(renderProps) => (
                <a className="boba-button NavBar-link" onClick={renderProps.onClick}>
                  {googleIcon} Logout
                </a>
              )}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login GoogleLogin"
              render={(renderProps) => (
                <a className="boba-button NavBar-link" onClick={renderProps.onClick}>
                  {googleIcon} Login
                </a>
              )}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
export { googleIcon, GOOGLE_CLIENT_ID };
