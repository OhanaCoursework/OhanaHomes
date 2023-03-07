import React from "react";
import Islands from "./components/Islands.js";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";

function IslandsApp() {
  return (
    <>
      <Navbar />
      <Islands />
      <Footer />
    </>
  );
}

export default IslandsApp;
