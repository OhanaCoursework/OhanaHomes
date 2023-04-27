import React from "react";
import "./islandsPage.css";

const IslandsPage = ({ islandData }) => {
  return (
    <section className="islandsPage">
      <div color="black" className="titleBlock">
        <h1 className="PageHeading">{islandData.island.uiText}</h1>
        <img
          className="HeadingImage"
          src={islandData.image}
          alt={islandData.alt}
        />
      </div>
      <div className="ourStoryBlock">
        <h2 id="OurStoryHeading">Why visit {islandData.island.uiText}?</h2>
        <p className="paragraph1">{islandData.description}</p>

        <a id="marketplaceBtn" aria-label="Button to the marketplace page" className="islandPageButton" href={"/marketplace?type=buy&island="+islandData.island.value}>
          View Homes On This Island
        </a>
      </div>
    </section>
  );
};

export default IslandsPage;
