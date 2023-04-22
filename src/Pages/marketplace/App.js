import React from "react";
import Marketplace from "./components/Marketplace.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";

function MarketplaceApp() {
  return (
    <>
      <Navbar />
      <Marketplace />
      <Footer />
    </>
  );
}

export default MarketplaceApp;
