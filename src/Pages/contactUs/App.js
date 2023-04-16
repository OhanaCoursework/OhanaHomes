import React from "react";
import ContactUs from "./components/contactUs.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";
import { contactUsData } from "../../data/pages/contactUs/data.js";

function contactUs() {
  return (
    <>
      <Navbar />
      <ContactUs {...contactUsData}/>
      <Footer />
    </>
  );
}

export default contactUs;
