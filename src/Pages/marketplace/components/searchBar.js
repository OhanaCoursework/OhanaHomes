import React, { useState } from "react";
import searchIcon from "../../../assets/images/icons/searchIcon.svg";

const SearchBar = ({ searchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  function handleChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <div className="searchDiv">
      <form id="marketplaceSearch" className="marketplaceSearchForm">
        <input
          type="text"
          placeholder="Enter an address, region, island, or ZIP code"
          className="marketplaceSearch"
          id="marketplaceSearchInput"
          value={inputValue}
          onChange={handleChange}
        />
        <img className="searchIcon" src={searchIcon} />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default SearchBar;
