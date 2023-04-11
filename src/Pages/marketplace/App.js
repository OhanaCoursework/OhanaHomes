import React from "react";
import Cards from "./components/Cards.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";

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
