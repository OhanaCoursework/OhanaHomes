import React from "react";
import "../styles/islands.css";

const Islands = ({ islandsData }) => {
  return (
    <section>
      <div className="islandsOuterGrid">
        <h1 className="islandGridTitle">Browse By Island</h1>
        <div className="islandsGrid">
          {islandsData.map((island) => (
            <div className="islandCard" key={island.island.value}>
              {
                <a aria-label="Button to the islands page" href={island.island.value} className="islandLink">
                  <img
                    className="islandImage"
                    src={island.image}
                    alt={island.alt}
                  ></img>
                  <div className="islandContent">
                    <h1 className="islandName">{island.island.uiText}</h1>
                    <div className="buttonDiv">
                      <span className="islandButton">View Homes</span>
                    </div>
                  </div>
                </a>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Islands;
