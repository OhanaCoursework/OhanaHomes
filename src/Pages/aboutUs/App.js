import React from "react";
import About from "./components/aboutUs.js";
import Navbar from "../../generalComponents/navbar/navbar.js";
import Footer from "../../generalComponents/footer/footer.js";
import { aboutUsData } from "../../data/pages/aboutUs/data.js";

function AboutUsPage() {
  return (
    <>
      <Navbar />
      <About {...aboutUsData} />
      <Footer />
    </>
  );
}

export default AboutUsPage;
