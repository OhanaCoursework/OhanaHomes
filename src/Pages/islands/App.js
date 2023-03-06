import React, { useState } from "react";
import Islands from "./components/Islands";
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
