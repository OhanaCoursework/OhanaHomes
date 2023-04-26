import React, { useState } from "react";
import property from "./propertyInfo";
import Modal from "./PropertyDModal.js";
import "./Styles/PropertyD.css";


const gimmeeDaModal = () => {
  const [showModal, setShowModal] = useState(false);

  const viewMoreInfoClick = () => {
    setShowModal(true);
  };

  const Close = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Property Details </h1>
      <div className="property-deets">
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
      {showModal && (
        <Modal onClose={Close} property={property} />
      )}
    </div>
  );
};

export default gimmeeDaModal;

