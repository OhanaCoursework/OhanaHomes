// imports
import React from "react";
import "./PropertyDetails.scss";
import { useParams } from "react-router-dom";
import {
  getBuyMarketplaceData,
  getRentMarketplaceData,
} from "../../../data/featuredPropetiesData/featuredPropertiesDataHelper";

// concant BUY and RENT data, use PropertyId to retrieve properties
const PropertyDetails = () => {
  const regex = /-/g;
  var property;
  let { propertyId } = useParams();

  let AllProperties = getBuyMarketplaceData().concat(getRentMarketplaceData());

  property = AllProperties.find((property) => property.id == propertyId);

  // main image, gallery, and further details block

  return (
    <section className="PropertyDetails">
      <div id="imageBlock">
        <div className="container">
          <img
            id="PropertyImg"
            src={property.image}
            alt={"image of " + property.title}
          ></img>
          <div className="gallery">
            <img
              id="Prop1"
              alt="property image 1"
              src={property.image1}
              style={{ width: "100%" }}
            ></img>
          </div>
          <div className="gallery">
            <img
              id="Prop2"
              alt="property image 2"
              src={property.image2}
              style={{ width: "100%" }}
            ></img>
          </div>
          <div className="gallery">
            <img
              id="Prop3"
              alt="property image 3"
              src={property.image3}
              style={{ width: "100%" }}
            ></img>
          </div>
        </div>
      </div>
      <div className="propertyDetailsBlock">
        <h2 id="propertyTitle">{property.title}</h2>
        <h3>{"Address: " + property.address}</h3>
        <h3>{"Price: " + property.price}</h3>
        <br></br>
        <ul>
          <li>{"Bedrooms: " + property.bedrooms}</li>
          <li>{"Bathrooms: " + property.bathrooms}</li>
          <li>{"Size (sq/Ft): " + property.size}</li>
          <li>{"Zipcode: " + property.zipcode}</li>
          <li>{"Move In Date: " + property.moveInDate.replace(regex, "/")}</li>
          <li>
            {"Date Added: " +
              property.dateAdded.replace(regex, "/").slice(0, 10)}
          </li>
        </ul>
      </div>
    </section>
  );
};

//exports

export default PropertyDetails;
