import React, { useEffect, useState } from "react";
import PropertiesGrid from "./propertiesGrid.js";
import "../styles/marketplace.css";
import SearchBar from "./searchBar.js";
import { Island } from "../../../data/enum/islandsEnum.js";
import {
  RentPrices,
  SalePrices,
  getPrice,
} from "../../../data/enum/pricesEnum.js";
import { MarketplaceTypeEnum } from "../../../data/enum/marketplaceTypeEnum.js";
import { getMarketplaceData } from "./marketplace.service.js";

const Marketplace = ({ marketplaceType, intialSearchQuery, filterIsland }) => {
  const [searchQuery, setSearchQuery] = useState(
    intialSearchQuery ? intialSearchQuery : ""
  );
  const [appliedFilters, setAppliedFilters] = useState(() =>
    getDefaultFiltering()
  );
  const [appliedSorting, setAppliedSorting] = useState(() =>
    getDefaultSorting()
  );
  const [housesList, setHousesList] = useState(() =>
    getMarketplaceData(
      searchQuery,
      appliedFilters,
      appliedSorting,
      marketplaceType
    )
  );

  function getPrices() {
    if (marketplaceType === MarketplaceTypeEnum.Buy) {
      return SalePrices;
    } else {
      return RentPrices;
    }
  }

  function getDefaultFiltering() {
    if (filterIsland) {
      return { island: filterIsland };
    }
    return;
  }

  function getDefaultSorting() {
    if (intialSearchQuery && intialSearchQuery.trim()) {
      return "most-relevant";
    }
    return "recent";
  }

  function dateOnChangeFilterHouses(event) {
    let filterValue = event.target.value;
    setAppliedFilters({ ...appliedFilters, moveInDate: filterValue });
  }

  function onChangeFilterHouses(event) {
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

  function updateMarketplaceData() {
    let newHouseList = getMarketplaceData(
      searchQuery,
      appliedFilters,
      appliedSorting,
      marketplaceType
    );
    setHousesList([...newHouseList]);
  }

  function onSearchSubmit(e) {
    e.preventDefault();
    let newSearchQueryValue = document.getElementById(
      "marketplaceSearchInput"
    ).value;
    if (newSearchQueryValue && newSearchQueryValue.trim()) {
      setAppliedSorting("most-relevant");
    } else {
      setAppliedSorting("recent");
    }
    setSearchQuery(newSearchQueryValue);
  }

  useEffect(() => {
    updateMarketplaceData();

    const searchForm = document.getElementById("marketplaceSearch");
    searchForm.addEventListener("submit", onSearchSubmit);

    return () => {
      searchForm.removeEventListener("submit", onSearchSubmit);
    };
  }, [appliedFilters, appliedSorting, searchQuery]);

  return (
    <section>
      <div className="marketplace" color="black">
        <h1 id="PageHeading">
          {marketplaceType === MarketplaceTypeEnum.Buy
            ? "Properties For Sale"
            : "Properties For Rent"}
        </h1>
        <SearchBar searchQuery={searchQuery} />
        <div className="outerFilterDiv">
          <div className="filterDiv">
            <select
              name="island"
              id="propertiesFilterIslands"
              className="propertiesFilter"
              title="Island Filter"
              onChange={onChangeFilterHouses}
              defaultValue={filterIsland}
            >
              <option value="">Any Island</option>
              {Island.getAllValues().map((island) => {
                return (
                  <option key={island.value} value={island.value}>
                    {island.uiText}
                  </option>
                );
              })}
            </select>
            <select
              name="minPrice"
              id="propertiesFilterMinPrice"
              className="propertiesFilter"
              title="Min Price Filter"
              onChange={onChangeFilterHouses}
            >
              <option value="" selected>
                No Min Price
              </option>
              {getPrices().map((price) => {
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
              title="Max Price Filter"
              onChange={onChangeFilterHouses}
            >
              <option value="" selected>
                No Max Price
              </option>
              {getPrices().map((price) => {
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
              title="Number of Beds Filter"
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
              title="Number of Baths Filter"
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
                id="propertiesFilterMoveInDate"
                name="moveIn"
                className="propertiesFilterMoveInDate"
                title="Move in date filter"
                type="date"
                onChange={dateOnChangeFilterHouses}
              ></input>
            </div>
          </div>
        </div>
        <PropertiesGrid
          housesList={housesList}
          appliedSorting={appliedSorting}
          setAppliedSorting={setAppliedSorting}
        />
      </div>
    </section>
  );
};

export default Marketplace;
