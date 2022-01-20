import React from "react";

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
  const suggestionToComponent = (suggestion) => {
    return (
      <div>
        <SingleSuggestion
          onClick={props.onChange}
          shopId={suggestion.id}
          selected={suggestion.id === props.selected}
          shopName={
            suggestion.name +
            " at " +
            suggestion.location.address1 +
            ", " +
            suggestion.location.city
          }
        >
          <span>{suggestion.name}</span> at{" "}
          <span>
            {suggestion.location.address1}, {suggestion.location.city}
          </span>
        </SingleSuggestion>
      </div>
    );
  };

  if (!props.shopFocused && props.selected !== "") {
    const possibleSelected = props.suggestions.filter((suggestion) => {
      return suggestion.id === props.selected;
    })[0];
    return possibleSelected ? suggestionToComponent(possibleSelected) : <></>;
  } else
    return props.suggestions.slice(0, 5).map((suggestion) => {
      return suggestionToComponent(suggestion);
    });
};

export default SuggestionBox;
