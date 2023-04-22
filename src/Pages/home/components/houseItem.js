import React from "react";

function HouseItem({ image, title, price }) {
  return (
    <div className="houseItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1> {title}</h1>
      <p>£{price}</p>
    </div>
  );
}

export default HouseItem;
