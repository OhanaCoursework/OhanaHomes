import React from "react";
import About from "./components/aboutUs";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";
import "@fontsource/lexend";

function HomeApp() {
  return (
    <>
      <Navbar />
      <About />
      <Footer />
    </>
  );
}

export default HomeApp;
