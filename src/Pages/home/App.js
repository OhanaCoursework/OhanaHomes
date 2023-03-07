import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";
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
