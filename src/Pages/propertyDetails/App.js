import React from "react";
import PropertyDetails from "./components/PropertyDetails.js";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";
import PropertyDetailsModal from "./components/PropertyDModal.js";
import propertyInfo from "./components/propertyInfo";

function PropertyDetailsApp() {
  return (
    <>
      <Navbar />
      <PropertyDetails />
      <PropertyDetailsModal propertyInfo={propertyInfo} />
      <Footer />
    </>
  );
}

export default PropertyDetailsApp;


