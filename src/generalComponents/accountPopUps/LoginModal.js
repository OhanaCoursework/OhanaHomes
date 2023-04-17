import React, { useEffect } from "react";
import { validateLogin } from "../../helpers/authenticator/authenticator.js";
/* Importing necessary files and images */
import "./LoginModal.css";

const LoginModal = () => {
  useEffect(() => {
    const loginForm = document.getElementById('loginForm'); 

    function formSubmit(e) {
      e.preventDefault(); //to prevent form submission
      console.log(e);
      console.log(e.target[0].value);
      validateLogin(e.target[0].value, e.target[1].value);
    }

    loginForm.addEventListener("submit", formSubmit);

    return(() => {
      loginForm.removeEventListener("submit", formSubmit);
    });
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button">&times;</span>
        <h1>Login</h1>
        <form id="loginForm">
          <label htmlFor="fname">First name:</label>
          <br />
          <input type="text" id="fname" name="fname" />
          <br />
          <label htmlFor="lname">Last name:</label>
          <br />
          <input type="text" id="lname" name="lname" /><br />
          <button type="submit">Sign in</button>
        </form>
        <br />
        <p>Don&apos;t have an account? <a>Create one</a></p>
      </div>
    </div>
  );
};

export default LoginModal;
