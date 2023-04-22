import React from "react";
import ContactUs from "./components/contactUs.js";
import Navbar from "../../generalComponents/navbar/Navbar.js";
import Footer from "../../generalComponents/footer/Footer.js";

function contactUs() {
  return (
    <>
      <Navbar />
      <ContactUs />
      <Footer />
    </>
  );
}

export default contactUs;
