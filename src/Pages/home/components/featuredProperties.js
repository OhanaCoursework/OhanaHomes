import React, { useState, useEffect, useRef } from "react";
import HouseItem from "./houseItem.js";
import { IoArrowForward, IoArrowBack } from "react-icons/io5"; // Import the icons
import { IoMdArrowRoundForward } from "react-icons/io";

import "../styles/houseItem.css";
import "../styles/featuredProperties.css";

const FeaturedProperties = ({ CardData }) => {
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items to show per page, initially set to 4
  const [touchStartX, setTouchStartX] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0); // Swipe count state

  const currentPageRef = useRef();
  currentPageRef.current = currentPage;

  const SWIPE_THRESHOLD = 50;
  const ITEM_WIDTH = 310;
  const CONTAINER_PADDING = 132;

  const handleBack = () => {
    // Decrement the current page by 1, but not below 0
    setCurrentPage(Math.max(0, currentPage - 1));
    setSwipeCount(swipeCount + 1); // Increment swipe count
  };

  const handleForward = () => {
    // Increment the current page by 1, but not above the number of pages
    setCurrentPage(
      Math.min(Math.floor(CardData.length / itemsPerPage) - 1, currentPage + 1)
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
    if (touchDistance > SWIPE_THRESHOLD) {
      // Reset touchStartX to prevent multiple pages swiping with one big swipe
      setTouchStartX(touchEndX);
      handleBack();
    }
    // If the touch distance is greater than a threshold (e.g. 50 pixels),
    // and the touch direction is negative, change to the next page
    else if (touchDistance < -SWIPE_THRESHOLD) {
      setTouchStartX(touchEndX);
      handleForward();
      // Reset touchStartX to prevent multiple pages swiping with one big swipe
    }
  };

  // Update itemsPerPage value based on window.innerWidth
  const updateItemsPerPage = () => {
    const newItemsPerPage = Math.max(
      Math.min(
        Math.floor((window.innerWidth * 0.98 - CONTAINER_PADDING) / ITEM_WIDTH),
        10
      ),
      1
    );
    setItemsPerPage(newItemsPerPage);
    if (
      currentPageRef.current >
      Math.floor(CardData.length / newItemsPerPage) - 1
    ) {
      setCurrentPage(Math.floor(cardData.length / newItemsPerPage) - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      // Left arrow key

      handleBack();
    } else if (e.key === "ArrowRight") {
      // Right arrow key
      handleForward();
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

  useEffect(() => {
    // Create an array to store the image URLs
    const imageUrlsToLoad = [];

    // Calculate the start and end index of items to display
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Loop through the CardData and add the image URLs to the array
    for (let i = startIndex; i < endIndex; i++) {
      if (CardData[i]) {
        imageUrlsToLoad.push(CardData[i].image);
      }
    }

    // Load the images into the browser cache
    const preloadImages = () => {
      const loadImage = (index) => {
        if (index >= imageUrlsToLoad.length) {
          return;
        }
        const image = new Image();
        image.src = imageUrlsToLoad[index];
        image.onload = () => {
          loadImage(index + 1);
        };
      };
      loadImage(0);
    };

    // Call the preloadImages function using requestAnimationFrame
    const preloadWithAnimationFrame = () => {
      requestAnimationFrame(preloadImages);
    };
    preloadWithAnimationFrame();

    // Load the next row of images if applicable
    if (currentPage < lastPage) {
      const nextStartIndex = (currentPage + 1) * itemsPerPage;
      const nextEndIndex = nextStartIndex + itemsPerPage;
      for (let i = nextStartIndex; i < nextEndIndex; i++) {
        if (CardData[i]) {
          imageUrlsToLoad.push(CardData[i].image);
        }
      }
      preloadWithAnimationFrame();
    }

    // Load the previous row of images if applicable
    if (currentPage > 0) {
      const prevStartIndex = (currentPage - 1) * itemsPerPage;
      const prevEndIndex = prevStartIndex + itemsPerPage;
      for (let i = prevStartIndex; i < prevEndIndex; i++) {
        if (CardData[i]) {
          imageUrlsToLoad.push(CardData[i].image);
        }
      }
      preloadWithAnimationFrame();
    }
  }, [currentPage, CardData]);

  // Calculate the start and end index of items to display
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const lastPage = Math.floor(CardData.length / itemsPerPage) - 1;

  return (
    <section onKeyDown={handleKeyDown} tabIndex={0}>
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
              {CardData.slice(startIndex, endIndex).map((houseItem, key) => {
                return (
                  <HouseItem
                    key={key}
                    id={houseItem.id}
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
          <a id="btn" aria-label="Button to the Marketplace page" className="viewHomesButton" href="/marketplace">
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
