import React from "react";
import "../styles/houseItem.css";
import bedIcon from "../../../assets/images/icons/bedIcon.svg";
import bathIcon from "../../../assets/images/icons/bathIcon.svg";
import sizeIcon from "../../../assets/images/icons/sizeIcon.svg";

function HouseItem({ image, title, price, bedrooms, bathrooms, size, id}) {
  return (
    <a aria-label="Button to the property details page" href={"/propertydetails/"+id} className="propertyLink">
      <div className="detailedHouseItem">

        <div style={{ backgroundImage: `url(${image})` }}></div>
        <h1> {title}</h1>
        <p>${price}</p>
        <hr />
        <p className="detailsParagraph">
          <img className="bedIcon" src={bedIcon} alt="Bed Icon"/> {bedrooms}{" "}
          {bedrooms > 1 ? "beds" : "bed"}
          <img className="bathIcon" src={bathIcon} alt="Bath Icon"/> {bathrooms}{" "}
          {bathrooms > 1 ? "baths\n" : "bath\n"}
          <img className="sizeIcon" src={sizeIcon} alt="Size Icon" /> {size}㎡
        </p>
      </div>
    </a>
  );
}

export default HouseItem;
