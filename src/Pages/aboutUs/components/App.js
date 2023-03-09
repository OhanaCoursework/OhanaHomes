import React from "react";
import About from "./components/aboutUs";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";
import { aboutUsData } from "../../data/pages/aboutUs/data.js";
import "@fontsource/lexend";

function AboutUs() {
  return (
    <>
      <Navbar />
      <About {...aboutUsData}/>
      <Footer />
    </>
  );
}

export default AboutUs;
