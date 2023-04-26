import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeApp from "./Pages/home/App.js";
import MarketplaceApp from "./Pages/marketplace/App.js";
import IslandsApp from "./Pages/islands/App.js";
import PropertyDetails from "./Pages/propertyDetails/components/PropertyDetails.js";
import AboutUsPage from "./Pages/aboutUs/App.js";
import LoginPage from "./Pages/login/App.js";
import SignUpPage from "./Pages/signUp/App.js";
import ContactUs from "./Pages/contactUs/App.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/marketplace" element={<MarketplaceApp />} />
        <Route path=":island" element={ <IslandsApp />} />
        <Route path="/propertydetails" element={<PropertyDetails />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
