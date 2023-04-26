// Importing React and CSS styles
import React from "react";
import "./Styles/PropertyD.css";

// Importing property data from a separate file
import property from "./propertyInfo";

// Functional component that renders a modal with property details
const PropertyDetailsModal = ({ onClose }) => {
  return (
    // Main container for the modal
    <div className="property-details-modal">
      <div className="property-details-content">
        {/* Header with property title and close button */}
        <div className="property-header">
          <h1>{property.title}</h1>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        {/* Body with property image and info */}
        <div className="property-details-body">
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
            <p>Keywords: {property.keywords.join(", ")}</p>
          </div>
        </div>
        {/* Footer with close button */}
        <div className="property-details-footer">
          <button className="close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Exporting the component as the default export
export default PropertyDetailsModal;