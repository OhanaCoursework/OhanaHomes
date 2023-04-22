import React from "react";
import "./islandsPage.css";

const IslandsPage = ({ islandData }) => {
  return (
    <section className="islandsPage">
      <div color="black" className="titleBlock">
        <h1 className="PageHeading">{islandData.island}</h1>
        <img
          className="HeadingImage"
          src={islandData.image}
          alt={islandData.alt}
        />
      </div>
      <div className="ourStoryBlock">
        <h2 id="OurStoryHeading">Why visit {islandData.island}?</h2>
        <p className="paragraph1">{islandData.description}</p>

        <a id="marketplaceBtn" className="islandPageButton" href="/marketplace">
          View Homes On This Island
        </a>
      </div>
    </section>
  );
};

export default IslandsPage;
