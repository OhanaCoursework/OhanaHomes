import React from "react";
import Hero from "./components/Hero.js";
import About from "./components/About.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";
import "@fontsource/lexend";

function HomeApp() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </>
  );
}

export default HomeApp;
