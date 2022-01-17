import React, { useState } from "react";

const SingleSuggestion = (props) => {
  return (
    <button
      className={"SuggestionBox-box boba-button" + (props.selected ? " boba-selected" : "")}
      onClick={(event) => {
        console.log("clicked");
        props.onClick(props.shopId, props.shopName);
      }}
      onMouseDown={(event) => event.preventDefault()}
    >
      {props.children}
    </button>
  );
};

const SuggestionBox = (props) => {
  if (!props.shopFocused && props.selected !== "") {
    const suggestion = props.suggestions.filter((s) => s.id === props.selected)[0];
    console.log(suggestion);
    return (
      <div>
        <SingleSuggestion
          onClick={props.onChange}
          shopId={suggestion.id}
          selected={suggestion.id === props.selected}
          shopName={
            suggestion.name +
            " on " +
            suggestion.location.address1 +
            ", " +
            suggestion.location.city
          }
        >
          <span>{suggestion.name}</span> on{" "}
          <span>
            {suggestion.location.address1}, {suggestion.location.city}
          </span>
        </SingleSuggestion>
      </div>
    );
  } else
    return props.suggestions.slice(0, 5).map((suggestion) => {
      return (
        <div>
          <SingleSuggestion
            onClick={props.onChange}
            shopId={suggestion.id}
            selected={suggestion.id === props.selected}
            shopName={
              suggestion.name +
              " on " +
              suggestion.location.address1 +
              ", " +
              suggestion.location.city
            }
          >
            <span>{suggestion.name}</span> on{" "}
            <span>
              {suggestion.location.address1}, {suggestion.location.city}
            </span>
          </SingleSuggestion>
        </div>
      );
    });
};

export default SuggestionBox;
