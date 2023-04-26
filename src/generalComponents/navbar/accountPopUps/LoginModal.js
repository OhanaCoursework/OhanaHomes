import React, { useEffect } from "react";
/* Importing necessary files and images */
import "./accountPopUp.css";
import { showAlert } from "../../alerts/alert";
import {
  isUserLoggedIn,
  attemptUserLogin,
} from "../../../helpers/authenticator/authenticator";
import FormField, {
  invalidateFormField,
  validateFormField,
} from "../../../generalComponents/form/formField";
import {
  hideLoginModal,
  openSignUpModal,
  displayLoggedInUI,
  resetLoginError,
} from "../../../helpers/authenticator/accountLoginHelper";

const LoginModal = () => {
  function usernameValidator(event) {
    presenceValidator(event.target, "Username is empty");
  }

  function passwordValidator(event) {
    presenceValidator(event.target, "Password is empty");
  }

  function presenceValidator(target, errorMessage) {
    if (target.value) {
      validateFormField(target);
      return true;
    } else {
      invalidateFormField(target, errorMessage);
      return false;
    }
  }

  function loginSubmit(e) {
    e.preventDefault(); //to prevent form submission
    const usernameInput = e.target[0];
    const passwordInput = e.target[1];

    resetLoginError();

    let valid = true;

    if (!presenceValidator(usernameInput, "Username is empty")) {
      valid = false;
    }
    if (!presenceValidator(passwordInput, "Password is empty")) {
      valid = false;
    }

    if (valid) {
      validateFormField(usernameInput);
      validateFormField(passwordInput);
      let error = attemptUserLogin(usernameInput.value, passwordInput.value);
      if (error) {
        displayLoginError(error);
      } else {
        if (isUserLoggedIn()) {
          displayLoggedInUI();
          hideLoginModal();
          showAlert("Login Successful", "success", true);
          return;
        }
      }
    }

    showAlert("Login Unsuccessful", "error", true);
  }

  function displayLoginError(error) {
    const loginError = document.getElementById("loginError");
    loginError.innerHTML = error;
    loginError.style.opacity = 1;
  }

  useEffect(() => {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", loginSubmit);

    const loginCloseButton = document.getElementById("loginCloseButton");
    loginCloseButton.addEventListener("click", hideLoginModal);

    return () => {
      loginForm.removeEventListener("submit", loginSubmit);
      loginCloseButton.removeEventListener("click", hideLoginModal);
    };
  });

  return (
    <div className="modal login">
      <div className="modal-content">
        <span id="loginCloseButton" className="close-button">
          &times;
        </span>
        <h1>Login</h1>
        <div className="modalForm">
          <p id="loginError" className="modalError"></p>
          <form id="loginForm" className="accountPopUpForm">
            <FormField
              name="username"
              id="loginUsername"
              label="Username"
              type="text"
              validator={usernameValidator}
            />
            <FormField
              name="password"
              id="loginPassword"
              label="Password"
              type="password"
              validator={passwordValidator}
            />
            <button id="login-submit" type="submit" className="submit">
              Sign in
            </button>
          </form>
        </div>
        <p className="otherAccountPopUpLink">
          Don&apos;t have an account?{" "}
          <a id="createAccountLink" onClick={openSignUpModal}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
