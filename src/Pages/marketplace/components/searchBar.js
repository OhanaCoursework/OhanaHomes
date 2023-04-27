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
          value={internalSearchQuery}
          onChange={handleChange}
        />
        <img className="searchIcon" src={searchIcon} />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default SearchBar;
