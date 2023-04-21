import React from "react";
/* Importing necessary files and images */
import "./accountPopUp.css";

const LoginModal = () => {
  return (
    <div className="modal login">
      <div className="modal-content">
        <span id="loginCloseButton" className="close-button">
          &times;
        </span>
        <h1>Login</h1>
        <div className="modalForm">
          <p id="loginError" className="modalError">Error</p>
          <form id="loginForm">
            <label htmlFor="username">Username:</label>
            <br />
            <input type="text" id="loginUsername" name="username" />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" id="loginPassword" name="password" autoComplete="new-password" />
            <br />
            <button type="submit" className="submit">
              Sign in
            </button>
          </form>
        </div>
        <p className="otherAccountPopUpLink">
          Don&apos;t have an account?{" "}
          <a id="createAccountLink">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
