import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import SuggestionBox from "./SuggestionBox";
import { get } from "../../utilities.js";
import RadioButton from "./RadioButton";

const SearchInput = (props) => {
  const [searchMethod, setSearchMethod] = useState("shop");
  const [input, setInput] = useState("");

  const [shopFocused, setShopFocused] = React.useState(false);
  const onShopFocus = () => setShopFocused(true);
  const onShopBlur = () => setShopFocused(false);
  const [suggestions, setSuggestions] = useState([]);
  const [shopId, setShopId] = useState("");
  const showSuggestions = () => {
    get("/api/autocomplete/shop", { term: input, location: "boston" }).then((res) => {
      setSuggestions(res.businesses);
    });
  };

  const shopSearch = (
    <>
      <DebounceInput
        onChange={(event) => {
          setInput(event.target.value);
          showSuggestions();
        }}
        debounceTimeout={300}
        placeholder="example: reece’s tea at 3 ames st, cambridge"
        className="boba-textinput"
        value={input}
        onFocus={onShopFocus}
        onBlur={onShopBlur}
        style={{ flexGrow: 1 }}
      />
    </>
  );
  const exampleText = {
    flavor: "example: Wintermelon Milk Tea",
    franchise: "example: Gong Cha",
    hot: "search across all hot drink reviews",
    cold: "search across all cold drink reviews",
    all: "show all reviews ;)",
  };
  return (
    <>
      <div className="u-flex">
        {searchMethod === "shop" ? (
          shopSearch
        ) : (
          <input
            type="text"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder={exampleText[searchMethod]}
            className="boba-textinput"
            value={input}
            onFocus={onShopFocus}
            onBlur={onShopBlur}
            style={{ flexGrow: 1 }}
          />
        )}
        <button
          className="boba-button"
          onClick={() => {
            if (searchMethod === "shop") {
              props.onSearch(shopId, searchMethod);
            } else {
              props.onSearch(input, searchMethod);
            }
          }}
        >
          Explore
        </button>
      </div>
      <SuggestionBox
        suggestions={suggestions}
        selected={shopId}
        onChange={(shopId, shopName) => {
          setInput(shopName);
          setShopId(shopId);
        }}
        shopFocused={shopFocused}
      />
      <div className="u-textCenter">Search by: </div>
      <div className="u-textCenter">
        <RadioButton
          name="searchMethods"
          elements={["shop", "flavor", "franchise", "hot", "cold", "all"]}
          checked={searchMethod}
          onClick={(event) => {
            setSearchMethod(event.target.parentNode.firstChild.value);
          }}
        />
      </div>
    </>
  );
};

export default SearchInput;
