import React, { useState } from "react";
import HouseItem from "./houseItem.js";
import { IoArrowForward, IoArrowBack } from "react-icons/io5"; // Import the icons

import "../styles/houseItem.css";
import "../styles/featuredProperties.css";

const FeaturedProperties = ({ cardData }) => {
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const itemsPerPage = 4; // Number of items to show per page

  const handleBack = () => {
    // Decrement the current page by 1, but not below 0
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const handleForward = () => {
    // Increment the current page by 1, but not above the number of pages
    setCurrentPage(
      Math.min(Math.ceil(cardData.length / itemsPerPage) - 1, currentPage + 1)
    );
  };

  // Calculate the start and end index of items to display
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <section>
      <h1 className="title-text">Featured Homes</h1>
      <div className="container">
        <div className="house">
          {/* Back button */}
          {currentPage > 0 && (
            <IoArrowBack className="arrowButtons left" onClick={handleBack} />
          )}
          <div className="houseList">
            {/* Map through the cards based on the calculated start and end index */}
            {cardData.slice(startIndex, endIndex).map((houseItem, key) => {
              return (
                <HouseItem
                  key={key}
                  image={houseItem.image}
                  title={houseItem.title}
                  price={houseItem.price}
                />
              );
            })}
          </div>
          {/* Forward button */}
          {currentPage < Math.ceil(cardData.length / itemsPerPage) - 1 && (
            <IoArrowForward
              className="arrowButtons right"
              onClick={handleForward}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
