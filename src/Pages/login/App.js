import React from "react";
import Login from "./components/login.js";
import Navbar from "../../generalComponents/navbar/Navbar";
import Footer from "../../generalComponents/footer/Footer";

function LoginPage() {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}

export default LoginPage;
