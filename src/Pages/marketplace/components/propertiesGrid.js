import React, { useState } from "react";

import HouseItem from "./houseItem.js";
import "../styles/propertiesGrid.css";
import {
  compareSizeDesc,
  compareSizeAsc,
  compareDateAddedDesc,
  comparePropertiesPriceAsc,
  comparePropertiesPriceDesc,
} from "../../../helpers/featuredPropetiesData/propertiesData";

const PropertiesGrid = ({housesList}) => {
  const [displayedHouseList, setDisplayedHouseList] = useState(
    housesList
  );

  function sortHousesList() {
    const propertiesSortSelect = document.getElementById("propertiesSort");

    let housesToSort = [].concat(displayedHouseList);
    let selected = propertiesSortSelect.value;
    switch (selected) {
      case "largest":
        console.log("here");
        housesToSort.sort(compareSizeAsc);
        break;
      case "smallest":
        housesToSort.sort(compareSizeDesc);
        break;
      case "lowest":
        housesToSort.sort(comparePropertiesPriceDesc);
        break;
      case "highest":
        console.log("here");
        housesToSort.sort(comparePropertiesPriceAsc);
        break;
      case "recent":
        housesToSort.sort(compareDateAddedDesc);
        break;
      default:
        console.log("here2");
        break;
    }

    setDisplayedHouseList(housesToSort);
  }

  return (
    <div className="propertiesGrid">
      <div className="propertiesGridContent">
        <select
          id="propertiesSort"
          className="propertiesSort"
          onChange={sortHousesList}
        >
          <option value="" selected disabled>Sort By</option>
          <option value="largest">Largest ㎡</option>
          <option value="smallest">Smallest ㎡</option>
          <option value="lowest">Lowest Price</option>
          <option value="highest">Highest Price</option>
          <option value="recent">Recently Added</option>
        </select>
        <div className="propertiesGridItems">
          {displayedHouseList.map((houseItem, key) => {
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
        </div>
      </div>
    </div>
  );
};

export default PropertiesGrid;
