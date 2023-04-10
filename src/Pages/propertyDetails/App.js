import React from "react";
import PropertyDetails from "./components/PropertyDetails.js";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";

function PropertyDetailsApp() {
  return (
    <>
      <Navbar />
      <PropertyDetails />
      <Footer />
    </>
  );
}

export default PropertyDetailsApp;
