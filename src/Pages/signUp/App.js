import React from "react";
import SignUp from "./components/signUp.js";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";

function SignUpPage() {
  return (
    <>
      <Navbar />
      <SignUp />
      <Footer />
    </>
  );
}

export default SignUpPage;
