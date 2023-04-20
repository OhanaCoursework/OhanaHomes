import React, { useEffect } from "react";
/* Importing necessary files and images */
import "./accountPopUp.css";

const LoginModal = () => {
  useEffect(() => {

  }, []);

  return (
    <div className="modal login">
      <div className="modal-content">
        <span id="loginCloseButton" className="close-button">&times;</span>
        <h1>Login</h1>
        <form id="loginForm">
          <label htmlFor="username">Username:</label>
          <br />
          <input type="text" id="username" name="username" />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="text" id="password" name="password" />
          <br />
          <button type="submit" className="submit">Sign in</button>
        </form>
        <p>
          Don&apos;t have an account? <a className="createAccountLink">Create one</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
