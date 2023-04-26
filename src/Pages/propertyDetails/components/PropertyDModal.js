// Importing CSS styles, React framework, and Data 
import React from "react";
import "./Styles/PropertyD.css";
import property from "./propertyInfo";

const PropertyDetailsModal = ( { onClose } ) => {
  
  return (
    
    <div className="property-details-modal">
      <div className="property-details-content">
        <div className="property-header">
          <h1>{property.title}</h1>
        </div>
        <button className="close" onClick={onClose}>
            &times;
          </button>

        <div className="property-details-body">
          <p>ayo issa body</p>
            <img src={property.image} alt={property.alt} />
            <div className="property-info">
              <h2>{property.title}</h2>
              <p>Price: £{property.price}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Size: {property.size}㎡</p>
              <p>Address: {property.address}</p>
              <p>Island: {property.island}</p>
              <p>Zipcode: {property.zipcode}</p>
              <p>Keywords: {property.keywords.join(', ')}</p>
            </div>
          </div>

          <div className="property-details-footer">
            <button className="close">Close</button>
              &times;
          </div>
        </div>
      </div>
    
  );
};

export default PropertyDetailsModal;

