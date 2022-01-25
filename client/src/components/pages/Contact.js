import React, { useState } from "react";
import { post } from "../../utilities";
import { navigate } from "@reach/router";
import "./NewReview.css";

const Contact = (props) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState([]);

  const handleClick = () => {
    post("/api/contact", contact)
      .then(() => {
        navigate(-1);
      })
      .catch((res) => {
        setErrors(JSON.parse(res.message).errors);
      });
  };

  return (
    <div className="boba-body">
      <h1>Contact</h1>
      <p>
        Questions about BobaBoss? Boba shop missing from our database? Ponderings about the meaning
        of life and boba? Let us know and we'll get back to you.
      </p>
      <div className="NewReview-container">
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setContact({ ...contact, name: event.target.value });
          }}
          placeholder="example: Tim the Beaver"
          className="boba-textinput"
          value={contact.name}
        />
        <label>Email</label>
        <input
          type="text"
          onChange={(event) => {
            setContact({ ...contact, email: event.target.value });
          }}
          placeholder="example: tim@mit.edu"
          className="boba-textinput"
          value={contact.email}
        />
        <label>Question</label>
        <textarea
          onChange={(event) => {
            setContact({ ...contact, message: event.target.value });
          }}
          placeholder="example: Why isn't there a boba shop in the Stud???"
          className="boba-textarea"
          value={contact.message}
        />
        <div></div>
        <div className="NewReview-errors">
          {errors.map((error) => (
            <p>error: {error}</p>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleClick} className="boba-button NewReview-submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
