import React from "react";
import "./PropertyDetails.scss";
import { useParams } from 'react-router-dom';
import { CardData as BuyCardData } from "../../../helpers/featuredPropetiesData/buyPropertiesData.js";
import { CardData as RentCardData } from "../../../helpers/featuredPropetiesData/rentPropertiesData.js";

const PropertyDetails = () =>  {
    const regex = /-/g;
    var property;
    let { propertyId } = useParams();

    let AllProperties = BuyCardData.concat(RentCardData);
    
    property = AllProperties.find(property => property.id == propertyId);
    
    return (
      <section className="PropertyDetails">
        
        <div id="imageBlock">
          <div className="container">
          <img id="PropertyImg" src={property.image} alt={"image of " + property.title}></img>
                    <div className="gallery">
                        <img id="Prop1" src={property.image1} style={{width: "100%"}}></img>
                    </div>
                    <div className="gallery">
                        <img id="Prop2"src={property.image2} style={{width: "100%"}}></img>
                    </div>
                    <div className="gallery">
                        <img id="Prop3" src={property.image3} style={{width: "100%"}}></img>
                    </div>
                </div>
        </div>
        <div className="propertyDetailsBlock">
          <h2>{property.title}</h2>
          <h3>{"Address: " + property.address}</h3>
          <h3>{"Price: "+property.price}</h3>
          <br></br>
          <ul>
            <li>{"Bedrooms: " + property.bedrooms}</li>
            <li>{"Bathrooms: " + property.bathrooms}</li>
            <li>{"Size (sq/Ft): " + property.size}</li>
            <li>{"Island: " + property.island}</li>
            <li>{"Zipcode: " + property.zipcode}</li>
            <li>{"Move In Date: " + property.moveInDate.replace(regex, "/")}</li>
            <li>{"Date Added: " + property.dateAdded.replace(regex, "/").slice(0,10)}</li>
          </ul>
          
        </div>
      </section>
    );
  };

export default PropertyDetails;
