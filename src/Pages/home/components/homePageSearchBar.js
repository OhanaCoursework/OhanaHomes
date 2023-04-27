import React, { useEffect } from "react";
import searchIcon from "../../../assets/images/icons/searchIcon.svg";
import "../styles/homePageSearchBar.css";
import { createSearchParams, useNavigate } from "react-router-dom";

const HomePageSearchBar = () => {
  const navigate = useNavigate();
  function selectButton(event) {
    event.target.classList.add("selected");
    if (event.target.previousSibling) {
      event.target.previousSibling.classList.remove("selected");
    } else {
      event.target.nextSibling.classList.remove("selected");
    }
  }

  function navigateToMarketplace(e) {
    e.preventDefault();
    let type = document.querySelector(".selected").name;
    let searchQuery = document.getElementById("homePageSearchInput").value;
    navigate({
      pathname: "/marketplace",
      search: `${createSearchParams({ type: type, searchQuery: searchQuery })}`,
    });
  }

  useEffect(() => {
    const homePageSearchForm = document.getElementById("homePageSearch");
    homePageSearchForm.addEventListener("submit", navigateToMarketplace);

    return () => {
      homePageSearchForm.removeEventListener("submit", navigateToMarketplace);
    };
  });

  return (
    <div className="searchDiv homePage">
      <div className="searchBarButtons">
        <button
          id="buySearchButton"
          name="buy"
          className="searchBarButton buy selected"
          onClick={selectButton}
        >
          Buy
        </button>
        <button
          id="rentSearchButton"
          name="rent"
          className="searchBarButton rent"
          onClick={selectButton}
        >
          Rent
        </button>
      </div>
      <form id="homePageSearch" className="marketplaceSearchForm">
        <input
          type="text"
          placeholder="Enter an address, region, island, or ZIP code"
          className="marketplaceSearch"
          id="homePageSearchInput"
          aria-label="Text input to search for properties on marketplace page"
        />
        <img alt="Search icon" className="searchIcon" src={searchIcon} />
        <input aria-label="hidden submit button" type="submit" hidden />
      </form>
    </div>
  );
};

export default HomePageSearchBar;
