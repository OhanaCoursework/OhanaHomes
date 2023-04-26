import React, { useEffect } from "react";

import HouseItem from "./houseItem.js";
import "../styles/propertiesGrid.css";
import {
  compareSizeDesc,
  compareSizeAsc,
  compareDateAddedDesc,
  comparePropertiesPriceAsc,
  comparePropertiesPriceDesc,
  comparePriorityDesc,
} from "../../../helpers/featuredPropetiesData/buyPropertiesData.js";

const PropertiesGrid = ({ housesList, setHouseList }) => {
  function sortHousesList() {
    const propertiesSortSelect = document.getElementById("propertiesSort");

    let housesToSort = [].concat(housesList);
    let selected = propertiesSortSelect.value;
    switch (selected) {
      case "biggest":
        housesToSort.sort(compareSizeAsc);
        break;
      case "smallest":
        housesToSort.sort(compareSizeDesc);
        break;
      case "lowest":
        housesToSort.sort(comparePropertiesPriceDesc);
        break;
      case "highest":
        housesToSort.sort(comparePropertiesPriceAsc);
        break;
      case "recent":
        housesToSort.sort(compareDateAddedDesc);
        break;
      case "most-relevant":
        if (housesToSort[0].priority) {
          housesToSort.sort(comparePriorityDesc);
        }
        break;
      default:
        console.log("here2");
        break;
    }

    setHouseList(housesToSort);
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

  function handleShowingProperties(housesList) {
    if (housesList && housesList.length) {
      resetNoPropertiesFound();
    } else {
      showNoPropertiesFound();
    }
  }

  useEffect(() =>{
    handleShowingProperties(housesList);
  });

  return (
    <div className="propertiesGrid">
      <div className="propertiesGridContent">
        <div className="propertiesGridItems">
          <div>
            <select
              id="propertiesSort"
              className="propertiesSort"
              onChange={sortHousesList}
            >
              <option value="" selected disabled>
                Sort By
              </option>
              <option value="most-relevant">Most Relevant</option>
              <option value="biggest">Biggest</option>
              <option value="smallest">Smallest</option>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
          {housesList.map((houseItem, key) => {
            return (
              <HouseItem
                key={key}
                image={houseItem.image}
                title={houseItem.title}
                price={houseItem.price}
                bedrooms={houseItem.bedrooms}
                bathrooms={houseItem.bathrooms}
                size={houseItem.size}
              />
            );
          })}
          <h1 id="noPropertiesFoundText" className="noPropertiesFoundText">
            No Properties Found, please search again
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PropertiesGrid;
