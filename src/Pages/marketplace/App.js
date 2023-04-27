import React from "react";
import Marketplace from "./components/marketplace.js";
import Navbar from "../../generalComponents/navbar/navbar.js";
import Footer from "../../generalComponents/footer/footer.js";
import { useSearchParams } from "react-router-dom";

function MarketplaceApp() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const searchQuery = searchParams.get('searchQuery');
  const island = searchParams.get('island');
  return (
    <>
      <Navbar />
      <Marketplace marketplaceType={type} intialSearchQuery={searchQuery} filterIsland={island}/>
      <Footer />
    </>
  );
}

export default MarketplaceApp;
