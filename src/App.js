import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeApp from "./Pages/home/App";
import MarketplaceApp from "./Pages/marketplace/App";
import Islands from "./Pages/islands/components/Islands";
import PropertyDetails from "./Pages/propertyDetails/components/PropertyDetails";
import AboutUsPage from "./Pages/aboutUs/App";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/marketplace" element={<MarketplaceApp />} />
        <Route path="/islands" element={<Islands />} />
        <Route path="/propertydetails" element={<PropertyDetails />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
      </Routes>
    </div>
  );
}

export default App;
