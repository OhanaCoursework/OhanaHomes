import React, { useState } from "react";
import Cards from "./components/Cards";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";

function MarketplaceApp() {
  return (
    <>
      <Navbar />
      <Cards />
      <Footer />
    </>
  );
}

export default MarketplaceApp;
