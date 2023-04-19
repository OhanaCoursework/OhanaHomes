import React, { useState, useEffect, useRef } from "react";
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

  const currentPageRef = useRef();
  currentPageRef.current = currentPage;

  const handleBack = () => {
    // Decrement the current page by 1, but not below 0
    setCurrentPage(Math.max(0, currentPage - 1));
    setSwipeCount(swipeCount + 1); // Increment swipe count
  };

  const handleForward = () => {
    // Increment the current page by 1, but not above the number of pages
    setCurrentPage(
      Math.min(Math.floor(cardData.length / itemsPerPage) - 1, currentPage + 1)
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

  // Update itemsPerPage value based on window.innerWidth
  const updateItemsPerPage = () => {
    const newItemsPerPage = Math.max(Math.min(
      Math.floor(((window.innerWidth * 0.98) - 132) / 310),
      10
    ),1);
    console.log("New per page:" + newItemsPerPage);
    console.log(window.innerWidth);
    setItemsPerPage(newItemsPerPage);
    if (
      currentPageRef.current >
      Math.floor(cardData.length / newItemsPerPage) - 1
    ) {
      console.log("update page");
      setCurrentPage(Math.floor(cardData.length / newItemsPerPage) - 1);
    }
  };

  useEffect(() => {
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
  const lastPage = Math.floor(cardData.length / itemsPerPage) - 1;

  return (
    <section>
      <h1 className="title-text">Featured Homes</h1>
      <div className="container">
        <div className="featuredHomes">
          <div className="house">
            {/* Back button */}
            <IoArrowBack
              className={
                currentPage > 0
                  ? "arrowButtons left visible"
                  : "arrowButtons left"
              }
              onClick={handleBack}
              id="backBtn"
            />
            <div
              className="houseList"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              id="houseList"
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
            <IoArrowForward
              className={
                currentPage < lastPage
                  ? "arrowButtons right visible"
                  : "arrowButtons right"
              }
              onClick={handleForward}
              id="forwardBtn"
            />
          </div>
          <div className="custom-progress-bar">
            <span
              style={{
                width: `${(currentPage / lastPage) * 100}%`,
              }}
            ></span>
          </div>
          <a id="btn" className="viewHomesButton" href="/marketplace">
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
