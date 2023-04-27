import React from "react";
import Marketplace from "./components/Marketplace.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";
import { useSearchParams } from "react-router-dom";

function MarketplaceApp() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const searchQuery = searchParams.get('searchQuery');
  return (
    <>
      <Navbar />
      <Marketplace marketplaceType={type} intialSearchQuery={searchQuery}/>
      <Footer />
    </>
  );
}

export default MarketplaceApp;
