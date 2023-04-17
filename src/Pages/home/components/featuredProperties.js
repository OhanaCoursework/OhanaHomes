import React, { useState, useEffect } from "react";
import HouseItem from "./houseItem.js";
import { IoArrowForward, IoArrowBack } from "react-icons/io5"; // Import the icons
import { IoMdArrowRoundForward } from "react-icons/io";

import "../styles/houseItem.css";
import "../styles/featuredProperties.css";

const FeaturedProperties = ({ cardData }) => {
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items to show per page, initially set to 4
  const [touchStartX, setTouchStartX] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0); // Swipe count state

  const handleBack = () => {
    // Decrement the current page by 1, but not below 0
    setCurrentPage(Math.max(0, currentPage - 1));
    setSwipeCount(swipeCount + 1); // Increment swipe count
  };

  const handleForward = () => {
    // Increment the current page by 1, but not above the number of pages
    setCurrentPage(
      Math.min(Math.ceil(cardData.length / itemsPerPage) - 1, currentPage + 1)
    );
    setSwipeCount(swipeCount + 1); // Increment swipe count
  };

  const handleTouchStart = (e) => {
    // Store the starting touch position
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    // Calculate the distance moved during the touch
    const touchEndX = e.touches[0].clientX;
    const touchDistance = touchEndX - touchStartX;

    // If the touch distance is greater than a threshold (e.g. 50 pixels),
    // and the touch direction is positive, change to the previous page
    if (touchDistance > 50) {
      // Reset touchStartX to prevent multiple pages swiping with one big swipe
      setTouchStartX(touchEndX);
      handleBack();
    }
    // If the touch distance is greater than a threshold (e.g. 50 pixels),
    // and the touch direction is negative, change to the next page
    else if (touchDistance < -50) {
      setTouchStartX(touchEndX);
      handleForward();
      // Reset touchStartX to prevent multiple pages swiping with one big swipe
    }
  };

  useEffect(() => {
    // Update itemsPerPage value based on window.innerWidth
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 1400 && window.innerWidth >= 1180) {
        setItemsPerPage(3);
      } else if (window.innerWidth <= 800 && window.innerWidth > 650) {
        setItemsPerPage(2);
      } else if (window.innerWidth <= 650) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };

    // Check initial window width and update itemsPerPage accordingly
    updateItemsPerPage();

    // Add event listener for window resize
    window.addEventListener("resize", updateItemsPerPage);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

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
          <div
            className="houseList"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
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
          <div className="custom-progress-bar">
            <span
              style={{
                width: `${
                  ((currentPage + 1) /
                    Math.ceil(cardData.length / itemsPerPage)) *
                  100
                }%`,
              }}
            ></span>
          </div>
          <a id="linkToAboutUs" href="/aboutUs">
            <button className="button" type="button">
              View Homes <IoMdArrowRoundForward className="arrow" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
