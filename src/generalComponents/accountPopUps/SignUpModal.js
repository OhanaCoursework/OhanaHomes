import React from "react";
/* Importing necessary files and images */
import "./accountPopUp.css";

const SignUpModal = () => {

  return (
    <div className="modal signUp">
      <div className="modal-content">
        <span className="close-button">&times;</span>
        <h1>Create Account</h1>
        <form id="signUpForm">
          <label htmlFor="username">Username:</label>
          <br />
          <input type="text" id="username" name="username" />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="text" id="password" name="password" />
          <br />
          <label htmlFor="anotherPassword">Repeat Password:</label>
          <br />
          <input type="text" id="anotherPassword" name="anotherPassword" />
          <br />
          <button type="submit" className="submit">Sign in</button>
        </form>
        <p>
          Already have and account? <a className="loginLink">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
