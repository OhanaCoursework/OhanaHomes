import React from "react";
import "../styles/houseItem.css";
import bedIcon from "../../../assets/images/icons/bedIcon.svg";
import bathIcon from "../../../assets/images/icons/bathIcon.svg";
import sizeIcon from "../../../assets/images/icons/sizeIcon.svg";

function HouseItem({ image, title, price, bedrooms, bathrooms, size }) {
  return (
    <div className="detailedHouseItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1> {title}</h1>
      <p>£{price}</p>
      <hr />
      <p className="detailsParagraph">
        <img className="bedIcon" src={bedIcon} /> {bedrooms}{" "}
        {bedrooms > 1 ? "beds" : "bed"}
        <img className="bathIcon" src={bathIcon} /> {bathrooms}{" "}
        {bathrooms > 1 ? "baths\n" : "bath\n"}
        <img className="sizeIcon" src={sizeIcon} /> {size}㎡
      </p>
    </div>
  );
}

export default HouseItem;
