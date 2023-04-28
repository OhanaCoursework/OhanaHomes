import React from "react";

function HouseItem({ id, image, title, price }) {
  return (
    <a aria-label="Button to the property details page" href={"/propertydetails/"+id} className="propertyLink">
      <div className="houseItem">
        <div style={{ backgroundImage: `url(${image})` }}></div>
        <h1> {title}</h1>
        <p>${price}</p>
      </div>
    </a>
  );
}

export default HouseItem;
