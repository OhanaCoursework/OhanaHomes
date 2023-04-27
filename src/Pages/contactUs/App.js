import React from "react";
import ContactUs from "./components/contactUs.js";
import Navbar from "../../generalComponents/navbar/navbar.js";
import Footer from "../../generalComponents/footer/footer.js";

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
