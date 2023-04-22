import React from "react";
/* Importing necessary files and images */
import "./accountPopUp.css";

const SignUpModal = () => {
  return (
    <div className="modal signUp">
      <div className="modal-content">
        <span id="signUpCloseButton" className="close-button">
          &times;
        </span>
        <h1>Create Account</h1>
        <div className="modalForm">
          <p id="signUpError" className="modalError">
            Error
          </p>
          <form id="signUpForm">
            <label htmlFor="username">Username:</label>
            <br />
            <input type="text" id="signUpUsername" name="username" />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="signUpPassword"
              name="password"
              autoComplete="new-password"
            />
            <br />
            <label htmlFor="anotherPassword">Repeat Password:</label>
            <br />
            <input
              type="password"
              id="anotherPassword"
              name="anotherPassword"
              autoComplete="off"
            />
            <br />
            <button id="signup-submit" type="submit" className="submit">
              Create Account
            </button>
          </form>
        </div>
        <p className="otherAccountPopUpLink">
          Already have and account? <a id="loginLink">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
