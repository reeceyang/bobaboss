import React, { useState } from "react";

const RadioButton = (props) => {
  return (
    <div onChange={props.onClick} className="u-textCenter">
      {props.elements.map((value) => {
        return (
          <label onClick={props.onClick}>
            <input
              type="radio"
              value={value}
              name={props.name}
              checked={value === props.checked}
              style={{ display: "none" }}
            />
            <button className={"boba-button " + (value === props.checked ? "boba-selected" : "")}>
              {value}
            </button>
          </label>
        );
      })}
    </div>
  );
};

export default RadioButton;
