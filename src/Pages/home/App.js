import React from "react";
import Hero from "./components/Hero.js";
import About from "./components/About.js";
import Islands from "./components/Islands.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";
import { SliderDataOne } from "../../helpers/heroData/sliderData.js";
import { IslandsData } from "../../helpers/islandsData/islandsData.js";
import FeaturedProperties from "./components/featuredProperties.js";
import { CardData as buyPropertiesData } from "../../helpers/featuredPropetiesData/buyPropertiesData.js";

function HomeApp() {
  return (
    <>
      <Navbar />
      <Hero slides={SliderDataOne} />
      <FeaturedProperties CardData={buyPropertiesData} />
      <About />
      <Islands islandsData={IslandsData} />
      <Footer />
    </>
  );
}

export default HomeApp;
