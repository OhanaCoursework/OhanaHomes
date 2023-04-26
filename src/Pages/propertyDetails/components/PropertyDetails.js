// Importing React and useState hook for managing component state
// useState is a hook provided by React that allows functional components to have state variables.
import React, { useState } from "react";

// Importing property data from a separate file
//Garf's stuff
import property from "./propertyInfo";

// Importing Details Modal component and CSS styles
import Modal from "./PropertyDModal.js";
import "./Styles/PropertyD.css";

// Function component that renders property information and a modal
const gimmeeDaModal = () => {

  // Initializing state variable for the modal
  const [showModal, setShowModal] = useState(false);

  // Function that sets showModal to true when the "View More Info" button is clicked
  const viewMoreInfoClick = () => {
    setShowModal(true);
  };

  // Function that sets showModal to false when the "Close" button is clicked in the modal
  const Close = () => {
    setShowModal(false);
  };

  return (
    // Main container for the component
    <div>
      <h1>Property Details </h1>
      <div className="property-deets">
        {/* Button that triggers the modal */}
        <div className="button" onClick={viewMoreInfoClick}>
          <img src={property.image} alt={property.alt} />
          <h2>{property.title}</h2>
          <p>{property.description}</p>
          <p>Price: {property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <p>Size: {property.size}㎡</p>
          <p>Address: {property.address}</p>
          <p>Island: {property.island}</p>
          <p>Zipcode: {property.zipcode}</p>
          <p>Keywords: {property.keywords.join(", ")}</p>
        </div>
      </div>
      {/* Render the modal if showModal is true */}
      {showModal && (
        <Modal onClose={Close} property={property} />
      )}
    </div>
  );
};

// Exporting the component as the default export
export default gimmeeDaModal;