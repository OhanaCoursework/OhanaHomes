import React from "react";
import Hero from "./components/hero.js";
import About from "./components/About.js";
import Islands from "./components/Islands.js";
import Navbar from "../../generalComponents/navbar/navbar.js";
import Footer from "../../generalComponents/footer/footer.js";
import { SliderDataOne } from "../../data/pages/homePage/sliderData.js";
import FeaturedProperties from "./components/featuredProperties.js";
import { buyPropertiesData } from "../../data/featuredPropetiesData/buyPropertiesData.js";
import { IslandsData } from "../../data/islandsData/islandsData.js";

function HomeApp() {
  return (
    <>
      <Navbar />
      <Hero slides={SliderDataOne} />
      <FeaturedProperties cardData={buyPropertiesData} />
      <About />
      <Islands islandsData={IslandsData} />
      <Footer />
    </>
  );
}

export default HomeApp;
