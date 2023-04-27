import React, { useEffect } from "react";

import HouseItem from "./houseItem.js";
import "../styles/propertiesGrid.css";

const PropertiesGrid = ({ housesList, appliedSorting, setAppliedSorting }) => {
  function sortOnChange(event) {
    event.preventDefault();
    setAppliedSorting(event.target.value);
  }

  useEffect(() => {
    const propertiesSort = document.getElementById("propertiesSort");
    if (propertiesSort) {
      propertiesSort.value = appliedSorting;
    }
  });

  return (
    <div className="propertiesGrid">
      <div className="propertiesGridContent">
        <div className="propertiesGridItems">
          <div>
            {housesList && housesList.length > 0 && (
              <select
                id="propertiesSort"
                className="propertiesSort"
                onChange={sortOnChange}
              >
                <option value="most-relevant">Most Relevant</option>
                <option value="biggest">Biggest</option>
                <option value="smallest">Smallest</option>
                <option value="lowest">Lowest Price</option>
                <option value="highest">Highest Price</option>
                <option value="recent">Recently Added</option>
              </select>
            )}
          </div>
          {housesList &&
            housesList.length > 0 &&
            housesList.map((houseItem, key) => {
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
          {!housesList || housesList.length <= 0 && (
            <h1 id="noPropertiesFoundText" className="noPropertiesFoundText">
              No Properties Found, please search again
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesGrid;
