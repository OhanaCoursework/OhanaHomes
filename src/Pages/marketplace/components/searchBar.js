import React, { useState } from "react";
import searchIcon from "../../../assets/images/icons/searchIcon.svg";

const SearchBar = ({ searchQuery }) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);

  function handleChange(event) {
    setInternalSearchQuery(event.target.value);
  }

  return (
    <div className="searchDiv">
      <form id="marketplaceSearch" className="marketplaceSearchForm">
        <input
          type="text"
          placeholder="Enter an address, region, island, or ZIP code"
          className="marketplaceSearch"
          id="marketplaceSearchInput"
          aria-label="Text input to search for properties on marketplace page"
          value={internalSearchQuery}
          onChange={handleChange}
        />
        <img alt="Search icon" className="searchIcon" src={searchIcon} />
        <input aria-label="Hidden submit button" type="submit" hidden />
      </form>
    </div>
  );
};

export default SearchBar;
