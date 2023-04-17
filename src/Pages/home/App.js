import React from "react";
import Hero from "./components/Hero.js";
import About from "./components/About.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";
import { SliderDataOne } from "../../helpers/heroData/sliderData.js";

function HomeApp() {
  return (
    <>
      <Navbar />
      <Hero slides={SliderDataOne} />
      <About />
      <Footer />
    </>
  );
}

export default HomeApp;
