import { navigate } from "@reach/router";
import React from "react";
import GoogleLogin from "react-google-login";
import { googleIcon, GOOGLE_CLIENT_ID } from "./NavBar.js";
import { post } from "../../utilities.js";

const Join = (props) => {
  return (
    <div className="boba-box u-textCenter">
      <h3>Discover your next flavor</h3>
      <div>Join BobaBoss to post reviews!</div>
      <div>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={(res) => {
            console.log(`Logged in as ${res.profileObj.name}`);
            const userToken = res.tokenObj.id_token;
            post("/api/login", { token: userToken }).then((user) => {
              props.setters.setUserId(user._id);
              props.setters.setUserName(user.name);
            });
            navigate(-1);
          }}
          onFailure={(err) => console.log(err)}
          className="NavBar-login GoogleLogin"
          render={(renderProps) => (
            <button
              className="boba-button"
              style={{ backgroundColor: "var(--white)" }}
              onClick={renderProps.onClick}
            >
              {googleIcon} Login
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default Join;
