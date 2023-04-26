import React, { useEffect, useState } from "react";
import PropertiesGrid from "./propertiesGrid.js";
import "../styles/marketplace.css";
import searchIcon from "../../../assets/images/icons/searchIcon.svg";
import { getSortedCardData } from "../../../helpers/featuredPropetiesData/buyPropertiesData.js";
import { comparePriorityDesc } from "../../../helpers/featuredPropetiesData/buyPropertiesData.js";
import { Islands } from "../../../helpers/islandsData/islandsEnum.js";
import {
  Prices,
  getPrice,
} from "../../../helpers/MarketplaceData/pricesEnum.js";

const Marketplace = () => {
  const [housesList, sethousesList] = useState(getSortedCardData());
  const [filteredHousesList, setFilteredHousesList] = useState(
    getSortedCardData()
  );
  const [appliedFilters, setAppliedFilters] = useState();

  function search(searchQuery) {
    let results = [];
    let lowerCaseSearchQuery = searchQuery.toLowerCase();
    let regMap = lowerCaseSearchQuery
      .split(" ")
      .filter(function (word) {
        return word.length > 1;
      })
      .map(function (word) {
        return new RegExp("\\b" + word + "\\b", "gi");
      });

    if (regMap.length > 0) {
      results = getSortedCardData()
        .reduce((results, property) => {
          let priority = 0;

          property.regions.forEach((region) => {
            if (lowerCaseSearchQuery.includes(region.toLowerCase())) {
              priority += 100;
            }
          });

          for (let reg of regMap) {
            if (property.island.toString().toLowerCase().trim().match(reg)) {
              priority += 10;
            }
            if (property.zipcode.toString().toLowerCase().trim().match(reg)) {
              priority += 1000;
            }
            if (property.title.toString().toLowerCase().trim().match(reg)) {
              priority += 1;
            }
            if (property.address.toString().toLowerCase().trim().match(reg)) {
              priority += 1;
            }
          }

          if (priority > 0) {
            results.push({ ...property, priority: priority });
          }

          return results;
        }, [])
        .sort(comparePriorityDesc);
    }

    console.log(results);
    return results;
  }

  function filterHousesList() {
    if (
      appliedFilters &&
      Object.keys(appliedFilters).length &&
      housesList &&
      housesList.length
    ) {
      let newHouseList = housesList;
      for (const [key, value] of Object.entries(appliedFilters)) {
        switch (key) {
          case "minPrice":
            newHouseList = newHouseList.filter(
              (house) => getPrice(house.price) > value
            );
            break;
          case "maxPrice":
            newHouseList = newHouseList.filter(
              (house) => getPrice(house.price) < value
            );
            break;
          case "island":
            console.log("here");
            newHouseList = newHouseList.filter(
              (house) => house.island === value
            );
            break;
          case "beds":
            console.log("bed");
            console.log(newHouseList);
            newHouseList = newHouseList.filter(
              (house) => house.bedrooms > value
            );
            break;
          case "baths":
            console.log("here");
            newHouseList = newHouseList.filter(
              (house) => house.bathrooms > value
            );
            break;
          case "moveInDate":
            console.log("here");
            newHouseList = newHouseList.filter(
              (house) => house.moveInDate > value
            );
            break;
        }
      }
      console.log(newHouseList);
      setFilteredHousesList(newHouseList);
      if (!newHouseList || !newHouseList.length) {
        showNoPropertiesFound();
      }
    } else {
      setFilteredHousesList(housesList);
    }
  }

  function dateOnChangeFilterHouses(event) {
    console.log(event);
    let filterValue = event.target.value;
    setAppliedFilters({ ...appliedFilters, moveInDate: filterValue });
  }

  function onChangeFilterHouses(event) {
    console.log(event);
    let filterValue = event.target.selectedOptions[0].value;
    let filter = event.target.name;

    switch (filter) {
      case "minPrice":
        setAppliedFilters({ ...appliedFilters, minPrice: filterValue });
        break;
      case "maxPrice":
        setAppliedFilters({ ...appliedFilters, maxPrice: filterValue });
        break;
      case "island":
        setAppliedFilters({ ...appliedFilters, island: filterValue });
        break;
      case "beds":
        setAppliedFilters({ ...appliedFilters, beds: filterValue });
        break;
      case "baths":
        setAppliedFilters({ ...appliedFilters, baths: filterValue });
        break;
    }
  }

  function setMostRelevantSorting() {
    document.getElementById("propertiesSort").value = "most-relevant";
  }

  function showNoPropertiesFound() {
    document
      .querySelector(".propertiesGridItems")
      .classList.add("noPropertiesFound");
  }

  function resetNoPropertiesFound() {
    document
      .querySelector(".propertiesGridItems")
      .classList.remove("noPropertiesFound");
  }

  useEffect(() => {
    function onSearchSubmit(e) {
      e.preventDefault(); //to prevent form submission
      if (e.target[0].value) {
        let searchResults = search(e.target[0].value);
        sethousesList(searchResults);
        if (searchResults && searchResults.length > 0) {
          resetNoPropertiesFound();
          setMostRelevantSorting();
        } else {
          showNoPropertiesFound();
        }
      } else {
        resetNoPropertiesFound();
        sethousesList(getSortedCardData());
      }
    }

    filterHousesList();

    document
      .getElementById("marketplaceSearch")
      .addEventListener("submit", onSearchSubmit);

    return () => {
      document
        .getElementById("marketplaceSearch")
        .removeEventListener("submit", onSearchSubmit);
    };
  }, [appliedFilters, housesList]);

  return (
    <section>
      <div className="marketplace" color="black">
        <h1 id="PageHeading">Marketplace Page</h1>
        <div className="searchDiv">
          <form id="marketplaceSearch" className="marketplaceSearchForm">
            <input
              type="text"
              placeholder="Enter an address, region, island, or ZIP code"
              className="marketplaceSearch"
              id="marketplaceSearchInput"
            />
            <img className="searchIcon" src={searchIcon} />
            <input type="submit" hidden />
          </form>
        </div>
        <div className="outerFilterDiv">
          <div className="filterDiv">
            <select
              name="island"
              id="propertiesFilterIslands"
              className="propertiesFilter"
              onChange={onChangeFilterHouses}
            >
              <option value="" selected disabled>
                Island
              </option>
              {Islands.map((island) => {
                return (
                  <option key={island} value={island.toLowerCase()}>
                    {island}
                  </option>
                );
              })}
            </select>
            <select
              name="minPrice"
              id="propertiesFilterMinPrice"
              className="propertiesFilter"
              onChange={onChangeFilterHouses}
            >
              <option value="" selected disabled>
                Min Price
              </option>
              {Prices.map((price) => {
                return (
                  <option key={price} value={getPrice(price)}>
                    {price}
                  </option>
                );
              })}
            </select>
            <select
              name="maxPrice"
              id="propertiesFilterMaxPrice"
              className="propertiesFilter"
              onChange={onChangeFilterHouses}
            >
              <option value="" selected disabled>
                Max Price
              </option>
              {Prices.map((price) => {
                return (
                  <option key={price} value={getPrice(price)}>
                    {price}
                  </option>
                );
              })}
            </select>
            <select
              name="beds"
              id="propertiesFilterBeds"
              className="propertiesFilter"
              onChange={onChangeFilterHouses}
            >
              <option value="0" selected>
                0+ Beds
              </option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
            <select
              name="baths"
              id="propertiesFilterBaths"
              className="propertiesFilter"
              onChange={onChangeFilterHouses}
            >
              <option value="0" selected>
                0+ Bathrooms
              </option>
              <option value="1">1+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
              <option value="5">5+ Bathrooms</option>
            </select>
            <div name="moveInDate" className="moveInDiv">
              <label htmlFor="moveIn">Move in from:</label>
              <input
                name="moveIn"
                className="propertiesFilterMoveInDate"
                type="date"
                onChange={dateOnChangeFilterHouses}
              ></input>
            </div>
          </div>
        </div>
        <PropertiesGrid
          housesList={filteredHousesList}
          setHouseList={sethousesList}
        />
      </div>
    </section>
  );
};

export default Marketplace;
